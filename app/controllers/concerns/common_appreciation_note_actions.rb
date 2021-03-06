module CommonAppreciationNoteActions
  extend ActiveSupport::Concern

  def index
    @appreciation_notes = current_wishlist.appreciation_notes
    respond_to do |format|
      format.html
      format.json { render json: @appreciation_notes }
    end
  end

  def show
    @appreciation_note = current_wishlist.appreciation_notes.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @appreciation_note }
    end
  end

  def create
    @appreciation_note = current_wishlist.appreciation_notes.create!(appreciation_note_params)
    flash[:success] = "Thank you! Your note has been added."
    respond_to do |format|
      format.html { render "show" }
      format.js
      format.json { render json: @appreciation_note }
    end
  end

  def update
    @appreciation_note = current_wishlist.appreciation_notes.find(params[:id])
    @appreciation_note.update!(appreciation_note_params)
    respond_to do |format|
      format.html { render "show" }
      format.js { render "create" }
      format.json { render json: @appreciation_note }
    end
  end

  def new
    @appreciation_note = current_wishlist.appreciation_notes.new
    respond_to do |format|
      format.html
      format.js
      format.json { render json: @appreciation_note }
    end
  end

  def edit
    @appreciation_note = current_wishlist.appreciation_notes.find(params[:id])
    respond_to do |format|
      format.html
      format.js
      format.json { render json: @appreciation_note }
    end
  end

  def destroy
    current_wishlist.appreciation_notes.delete(params[:id])
    respond_to do |format|
      format.html { render "index" }
      format.json { render json: current_wishlist.appreciation_notes.all}
    end
  end
  private
    def current_organization
      @organization
    end

    def current_campaign
      current_organization.campaigns.find(params[:campaign_id])
    end

    def current_wishlist
      current_campaign.wishlists.find(params[:wishlist_id])
    end

    def appreciation_note_params
      params.require(:appreciation_note).permit(:note, :data)
    end

end
