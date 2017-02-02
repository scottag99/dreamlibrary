# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170202202027) do

  create_table "books", force: :cascade do |t|
    t.string   "title"
    t.string   "author"
    t.text     "description"
    t.integer  "year"
    t.string   "isbn"
    t.string   "cover_image_url"
    t.string   "level"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.decimal  "ar_level"
    t.decimal  "ar_points"
  end

  create_table "campaigns", force: :cascade do |t|
    t.string   "name"
    t.date     "deadline"
    t.integer  "organization_id"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.boolean  "ready_for_donations"
    t.string   "address"
    t.index ["organization_id"], name: "index_campaigns_on_organization_id"
  end

  create_table "catalog_entries", force: :cascade do |t|
    t.integer  "catalog_id"
    t.integer  "book_id"
    t.decimal  "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_catalog_entries_on_book_id"
    t.index ["catalog_id"], name: "index_catalog_entries_on_catalog_id"
  end

  create_table "catalogs", force: :cascade do |t|
    t.string   "name"
    t.boolean  "active"
    t.string   "source"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "donations", force: :cascade do |t|
    t.integer  "wishlist_id"
    t.decimal  "amount"
    t.string   "confirmation_code"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["wishlist_id"], name: "index_donations_on_wishlist_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "partners", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.boolean  "active"
    t.integer  "organization_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["organization_id"], name: "index_partners_on_organization_id"
  end

  create_table "wishlist_entries", force: :cascade do |t|
    t.integer  "wishlist_id"
    t.integer  "catalog_entry_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["catalog_entry_id"], name: "index_wishlist_entries_on_catalog_entry_id"
    t.index ["wishlist_id"], name: "index_wishlist_entries_on_wishlist_id"
  end

  create_table "wishlists", force: :cascade do |t|
    t.string   "reader_name"
    t.integer  "reader_age"
    t.string   "reader_gender"
    t.integer  "campaign_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "teacher"
    t.index ["campaign_id"], name: "index_wishlists_on_campaign_id"
    t.index ["reader_name"], name: "index_wishlists_on_reader_name"
    t.index ["teacher"], name: "index_wishlists_on_teacher"
  end

end
