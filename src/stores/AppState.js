import { action, computed, observable } from 'mobx';

class AppState {
  @observable
  searchTerm = "Books...";

  @observable
  wishlist = [];

  @observable
  books = [];

  @observable
  cart = [];

  wishlistList = '/';

  constructor() {
    //This values are defined on common/_wishlist.html.erb
    this.wishlist = current_wishlist;
    this.books = all_active_books;
    this.wishlistList = back_url;
    this.reader = reader;
    this.grl = grl;
    this.bookLimit = book_limit;
    // convert letter value to int for comparison
    this.readerMin = this.grl.charCodeAt(0) - 1;
    this.readerMax = this.grl.charCodeAt(0) + 2;
  }

  @observable
  lvlFilter = '';

  @observable
  chapters = false;

  @observable
  grlFilter = '';

  @observable
  draFilter = '';

  @observable
  bilingualOnly = '';

  searchTerm = "";

  @computed
  get searchResults() {
    const term = this.searchTerm.toLowerCase();

    return this.books
      .filter(book => book.name.toLowerCase().indexOf(term) >= 0 || book.author.toLowerCase().indexOf(term) >= 0 || book.description.toLowerCase().indexOf(term) >= 0)
      .filter(book => this.filterByLevel(book))
      .filter(book => this.filterByChapters(book))
      .filter(book => !this.inWishlist(book));
  }

  @action
  addToWishList(book) {
    if(this.wishlist.find((b) => b.catalog_entry_id === book.catalog_entry_id)) {
      return;
    }
    appState.wishlist = appState.wishlist.concat(book);

    $.ajax({
      url: api_add_url,
      dataType: 'json',
      method: 'POST',
      data: {wishlist_entry: {catalog_entry_id: book.catalog_entry_id}}
    }).done(function(data) {
      book.id = data.id;
    }).fail(function(data, status, error) {
      $(".modal-title").html('Error Adding Book');
      $(".modal-body").html("Book limit most likely reached. Remove a book from your list in order to add this one.");
      $('#globalModalError').modal();
      appState.wishlist = appState.wishlist.filter(b => b.catalog_entry_id !== book.catalog_entry_id);
    });
  }

  @action
  removeFromWishList(book) {
    $.ajax({
      url: api_delete_url.replace(':id', book.id),
      dataType: 'json',
      method: 'DELETE'
    }).done(function(data) {
      book.id = null;
      appState.wishlist = appState.wishlist.filter(b => b.catalog_entry_id !== book.catalog_entry_id);
    });
  }

  goBack() {
    var diff = appState.bookLimit - appState.wishlist.length
    if(diff > 0) {
      $(".modal-title").html('Add more books!');
      $(".modal-body").html(`You can still add books! Please add ${diff} book(s) to your wishlist.`);
      $('#globalModalError').modal();
    } else {
      document.location.href=appState.wishlistList;
    }
  }

  handleGradeLevel(event) {
    appState.draFilter = '';
    appState.grlFilter = '';
    appState.lvlFilter = event.target.value;
  }

  handleGrlFilter(event) {
    appState.draFilter = '';
    appState.lvlFilter = '';
    appState.grlFilter = event.target.value;
  }

  handleDraFilter(event) {
    appState.grlFilter = '';
    appState.lvlFilter = ''
    appState.draFilter = event.target.value;
  }

  handleBilingualFilter(event) {
    appState.bilingualOnly = event.target.id;
  }

  handleChapterFilter(event) {
    appState.chapters = event.target.checked;
  }

  inWishlist(book) {
    if (appState.wishlist) {
      return appState.wishlist.find((wish) => wish.catalog_entry_id === book.catalog_entry_id);
    } else {
      return false;
    }
  }

  filterByChapters(book) {
    if(appState.chapters){
      if (book.is_chapter) {
        return true;
      }
      else {
        return false;
      }
    } else {
      return true;
    }
  }

  filterByLevel(book) {
    if (appState.bilingualOnly == 'bilingual' && !book.is_bilingual) {
      return false;
    }

    if (appState.bilingualOnly == 'english' && book.is_bilingual) {
      return false;
    }

    var draPresent = !(book.dra === undefined || book.dra.length < 1);
    var draMatch = false;
    if (draPresent && appState.draFilter) {
      var bminMax = book.dra.split("-").map(function(v){ return parseInt(v)});
      var bmin = isNaN(bminMax[0]) ? 0 : bminMax[0];
      var bmax = isNaN(bminMax[bminMax.length-1]) ? 80 : bminMax[bminMax.length-1];

      var fminMax = appState.draFilter.split("-").map(function(v){ return parseInt(v)});
      var fmin = isNaN(fminMax[0]) ? 0 : fminMax[0];
      var fmax = isNaN(fminMax[fminMax.length-1]) ? 80 : fminMax[fminMax.length-1];

      draMatch = (fmin <= bmin && bmin <= fmax) || (fmin <= bmax && bmax <= bmax);
    }

    var grlMatch = appState.grlFilter != '' && appState.grlFilter.split(",").includes(book.grl);
    var lvlMatch = appState.lvlFilter != '' && appState.lvlFilter.split(",").includes(book.level);

    //When any match is made, we always return true
    if (lvlMatch || grlMatch || draMatch) {
      return true;
    }

    var grlPresent = !(book.grl === undefined || book.grl.length < 1)
    var lvlPresent = !(book.level === undefined || book.level.length < 1)
    //If no levels exist on the book, return true
    //this keeps us from hiding books that can never be filterd
    //9/21/2017 - SJS: Commented this out b/c the next check should show all books when filters are disabled
    //                 When filters are on, it was decided these shouldn't match anymore
    // if (!draPresent && !grlPresent && !lvlPresent) {
    //   return true;
    // }

    //If the GRL or DRA filters are not on, and the book has no grade level, return true
    if (appState.grlFilter == '' && appState.draFilter == '' && appState.lvlFilter == '' ) {
      return true;
    }
    //Every other case should be false b/c there is a level value present but no filter matched
    return false;
  }
}

const appState = new AppState();

export default appState;
export { AppState };
