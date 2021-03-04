class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.references :account, null: false, foreign_key: true
      t.string :symbol
      t.string :bos
      t.integer :quantity
      t.float :price
      t.datetime :date
    end
  end
end
