# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_03_05_030639) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_accounts_on_user_id"
  end

  create_table "days", force: :cascade do |t|
    t.datetime "date"
    t.bigint "account_id", null: false
    t.float "cash"
    t.index ["account_id"], name: "index_days_on_account_id"
  end

  create_table "stocks", force: :cascade do |t|
    t.string "symbol"
    t.integer "quantity"
    t.float "price"
    t.string "sector"
    t.bigint "day_id", null: false
    t.index ["day_id"], name: "index_stocks_on_day_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "accounts", "users"
  add_foreign_key "days", "accounts"
  add_foreign_key "stocks", "days"
end
