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

rh = Account.create(user_id: dain.id, name: "Robinhood - Individual", cash: 1000.00)
fd = Account.create(user_id: dain.id, name: "Fidelity - 401k", cash: 1000.00)

t0 = Transaction.create(account_id: rh.id, symbol: "AAPL", bos: "Bought", quantity: 1, price: 125, date: "2021-02-26T00:00:00.000Z")
t1 = Transaction.create(account_id: rh.id, symbol: "TSLA", bos: "Bought", quantity: 1, price: 700, date: "2021-03-01T00:00:00.000Z")
t2 = Transaction.create(account_id: rh.id, symbol: "TSLA", bos: "Bought", quantity: 2, price: 700, date: "2021-03-02T00:00:00.000Z")
t3 = Transaction.create(account_id: rh.id, symbol: "TSLA", bos: "Bought", quantity: 1, price: 700, date: "2021-03-03T00:00:00.000Z")
t4 = Transaction.create(account_id: rh.id, symbol: "TSLA", bos: "Bought", quantity: 2, price: 700, date: "2021-03-03T00:00:00.000Z")
t5 = Transaction.create(account_id: rh.id, symbol: "TSLA", bos: "Sold", quantity: -2, price: 700, date: "2021-03-03T00:00:00.000Z")
t6 = Transaction.create(account_id: rh.id, symbol: "LMT", bos: "Bought", quantity: 1, price: 300, date: "2021-03-03T00:00:00.000Z")