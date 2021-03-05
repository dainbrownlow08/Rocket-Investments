# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Day.delete_all
Account.delete_all
User.delete_all

dain = User.create(username: "Dain", password: "123")

rh = Account.create(user_id: dain.id, name: "Robinhood - Individual")
fd = Account.create(user_id: dain.id, name: "Fidelity - 401k")



d1 = Day.create(date: "2021-03-03T00:00:00.000Z", account_id: rh.id, total: 0.0, cash: 0.0)
d2 = Day.create(date: "2021-03-04T00:00:00.000Z", account_id: rh.id, total: 0.0, cash: 0.0)