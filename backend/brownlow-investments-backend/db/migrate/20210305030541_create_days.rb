class CreateDays < ActiveRecord::Migration[6.0]
  def change
    create_table :days do |t|
      t.datetime :date
      t.references :account, null: false, foreign_key: true
      t.float :cash
    end
  end
end
