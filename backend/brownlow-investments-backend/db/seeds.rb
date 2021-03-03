# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Transaction.delete_all
Account.delete_all
User.delete_all

dain = User.create(username: "Dain", password: "123")

rh = Account.create(user_id: dain.id, name: "Robinhood - Individual")
fd = Account.create(user_id: dain.id, name: "Fidelity - 401k")


t1 = Transaction.create(account_id: rh.id, symbol: "TSLA", bos: "Bought", quantity: 5)
t2 = Transaction.create(account_id: rh.id, symbol: "TSLA", bos: "Bought", quantity: 5)
t3 = Transaction.create(account_id: rh.id, symbol: "TSLA", bos: "Sold", quantity: 5)