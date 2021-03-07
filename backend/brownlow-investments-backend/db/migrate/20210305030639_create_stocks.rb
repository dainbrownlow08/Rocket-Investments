class CreateStocks < ActiveRecord::Migration[6.0]
  def change
    create_table :stocks do |t|
      t.string :symbol
      t.integer :quantity
      t.float :price
      t.string :sector
      t.references :day, null: false, foreign_key: true
    end
  end
end
