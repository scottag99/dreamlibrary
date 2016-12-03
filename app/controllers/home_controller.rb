class HomeController < ApplicationController
  before_action :find_wishlists, only: [:search, :wishlists]

  def index
  end

  def login
    respond_to do |format|
      format.html
      format.json { render json: {:error => "No auth token sent"} }
    end
  end

  def logout
    reset_session
    redirect_to root_url
  end

  def library
  end

  def donate
    @schoolname = params[:schoolname]
    @wishListID = params[:wishlist_id]
    @donationLevel = params[:amount]
    @Semester = params[:campaign_name]
  end

  def search
  end

  def wishlists
    respond_to do |format|
      format.js {}
    end
  end

  def success
    wishlist = Wishlist.find(params[:wishlist_id])
    @donation = wishlist.donations.create!({:confirmation_code => params[:confirmation_code], :amount => params[:amount]})

    respond_to do |format|
      format.html { render "index" }
      format.json { render json: @donation }
    end
  end

private

  def find_wishlists
    term = params[:term]
    #By joining wishlist_entries, we get only wishlists with books added.
    if term.to_s.size < 2
      @wishlists = Wishlist.joins([{:campaign => :organization}, :wishlist_entries]).distinct.order('random()').limit(20).all
    else
      term = "%#{term}%"
      # ILIKE is a postgres extension so this fails in local dev environments
      @wishlists = Wishlist.joins([{:campaign => :organization}, :wishlist_entries]).distinct.where("deadline > ? and ready_for_donations = ? and (reader_name ilike ? or teacher ilike ? or organizations.name ilike ?)", Date.today, true, term, term, term).all
    end
  end
end
