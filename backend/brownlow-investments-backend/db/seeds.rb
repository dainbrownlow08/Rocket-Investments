# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Stock.delete_all
Day.delete_all
Account.delete_all
User.delete_all

dain = User.create(username: "Dain", password: "123")

rh = Account.create(user_id: dain.id, name: "Robinhood - Individual")
fd = Account.create(user_id: dain.id, name: "Fidelity - 401k")

# Dain Day Seeds

d1 = Day.create(date: "2021-02-09T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d11 = Day.create(date: "2021-02-09T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d2 = Day.create(date: "2021-02-10T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d22 = Day.create(date: "2021-02-10T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d3 = Day.create(date: "2021-02-11T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d33 = Day.create(date: "2021-02-11T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d4 = Day.create(date: "2021-02-12T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d44 = Day.create(date: "2021-02-12T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d5 = Day.create(date: "2021-02-13T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d55 = Day.create(date: "2021-02-13T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d6 = Day.create(date: "2021-02-14T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d66 = Day.create(date: "2021-02-14T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d7 = Day.create(date: "2021-02-15T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d77 = Day.create(date: "2021-02-15T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d8 = Day.create(date: "2021-02-16T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d88 = Day.create(date: "2021-02-16T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d9 = Day.create(date: "2021-02-17T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d99 = Day.create(date: "2021-02-17T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d10 = Day.create(date: "2021-02-18T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d1010 = Day.create(date: "2021-02-18T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d11 = Day.create(date: "2021-02-19T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d1111 = Day.create(date: "2021-02-19T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d12 = Day.create(date: "2021-02-20T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d1212 = Day.create(date: "2021-02-20T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d13 = Day.create(date: "2021-02-21T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d1313 = Day.create(date: "2021-02-21T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d14 = Day.create(date: "2021-02-22T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d1414 = Day.create(date: "2021-02-22T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d15 = Day.create(date: "2021-02-23T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d1515 = Day.create(date: "2021-02-23T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d16 = Day.create(date: "2021-02-24T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d1616 = Day.create(date: "2021-02-24T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d17 = Day.create(date: "2021-02-25T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d1717 = Day.create(date: "2021-02-25T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d18 = Day.create(date: "2021-02-26T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d1818 = Day.create(date: "2021-02-26T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d19 = Day.create(date: "2021-02-27T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d1919 = Day.create(date: "2021-02-27T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d20 = Day.create(date: "2021-02-28T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d2020 = Day.create(date: "2021-02-28T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d21 = Day.create(date: "2021-03-01T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d2121 = Day.create(date: "2021-03-01T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d22 = Day.create(date: "2021-03-03T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d2222 = Day.create(date: "2021-03-03T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d23 = Day.create(date: "2021-03-04T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d2323 = Day.create(date: "2021-03-04T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d24 = Day.create(date: "2021-03-05T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d2424 = Day.create(date: "2021-03-05T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d25 = Day.create(date: "2021-03-06T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d2525 = Day.create(date: "2021-03-06T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d26 = Day.create(date: "2021-03-07T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d2626 = Day.create(date: "2021-03-07T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d27 = Day.create(date: "2021-03-08T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d2727 = Day.create(date: "2021-03-08T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d28 = Day.create(date: "2021-03-09T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d2828 = Day.create(date: "2021-03-09T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d29 = Day.create(date: "2021-03-10T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d2929 = Day.create(date: "2021-03-10T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d30 = Day.create(date: "2021-03-11T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d3030 = Day.create(date: "2021-03-11T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d31 = Day.create(date: "2021-03-12T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d3131 = Day.create(date: "2021-03-12T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d32 = Day.create(date: "2021-03-13T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d3232 = Day.create(date: "2021-03-13T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d33 = Day.create(date: "2021-03-14T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d3333 = Day.create(date: "2021-03-14T00:00:00.000Z", account_id: fd.id,cash: 100.0)

d34 = Day.create(date: "2021-03-15T00:00:00.000Z", account_id: rh.id, cash: 100.0)
d3434 = Day.create(date: "2021-03-15T00:00:00.000Z", account_id: fd.id,cash: 100.0)







s1 = Stock.create(day_id: d1.id, sector: "Autos", symbol: "TSLA", quantity: 5, price: 849.46)
s1s1 = Stock.create(day_id: d11.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 136.01)

s2 = Stock.create(day_id: d2.id, sector: "Autos", symbol: "TSLA", quantity: 5, price: 804.82)
s2s2 = Stock.create(day_id: d22.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 135.39)

s3 = Stock.create(day_id: d3.id, sector: "Autos", symbol: "TSLA", quantity: 5, price: 811.66)
s3s3 = Stock.create(day_id: d33.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 135.13)

s4 = Stock.create(day_id: d4.id, sector: "Autos", symbol: "TSLA", quantity: 5, price: 816.12)
s4s4 = Stock.create(day_id: d44.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 135.37)

s5 = Stock.create(day_id: d5.id, sector: "Autos", symbol: "TSLA", quantity: 5, price: 816.12)
s5s5 = Stock.create(day_id: d55.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 135.37)

s6 = Stock.create(day_id: d6.id, sector: "Autos", symbol: "TSLA", quantity: 5, price: 816.12)
s6s6 = Stock.create(day_id: d66.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 135.37)

s7 = Stock.create(day_id: d7.id, sector: "Autos", symbol: "TSLA", quantity: 5, price: 816.12)
s7s7 = Stock.create(day_id: d77.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 135.37)

s8 = Stock.create(day_id: d8.id, sector: "Autos", symbol: "TSLA", quantity: 5, price: 796.22)
s8s8 = Stock.create(day_id: d88.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 133.19)

s9 = Stock.create(day_id: d9.id, sector: "Autos", symbol: "TSLA", quantity: 5, price: 798.15) 
s9s9 = Stock.create(day_id: d99.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 130.84) 

s10 = Stock.create(day_id: d10.id, sector: "Autos", symbol: "TSLA", quantity: 5, price: 787.38)
s10s10 = Stock.create(day_id: d1010.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 129.71)

s11 = Stock.create(day_id: d11.id, sector: "Autos", symbol: "TSLA", quantity: 5, price: 781.30)
s11s11 = Stock.create(day_id: d1111.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 129.87)

s12 = Stock.create(day_id: d12.id, sector: "Autos", symbol: "TSLA", quantity: 5, price: 781.30)
s12s12 = Stock.create(day_id: d1212.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 129.87)

s13 = Stock.create(day_id: d13.id, sector: "Autos", symbol: "TSLA", quantity: 5, price: 781.30)
s13s13 = Stock.create(day_id: d1313.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 129.87)

s14 = Stock.create(day_id: d14.id, sector: "Autos", symbol: "TSLA", quantity: 5, price: 714.50)
s14s14 = Stock.create(day_id: d1414.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 126.00)

s15 = Stock.create(day_id: d15.id, sector: "Autos", symbol: "TSLA", quantity: 5, price:  698.84)
s15s15 = Stock.create(day_id: d1515.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 125.86)

s16 = Stock.create(day_id: d16.id, sector: "Autos", symbol: "TSLA", quantity: 5, price: 742.02)
s16s16 = Stock.create(day_id: d1616.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 125.35)

s17 = Stock.create(day_id: d17.id, sector: "Autos", symbol: "TSLA", quantity: 5, price: 682.22)
s17s17 = Stock.create(day_id: d1717.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 120.99)

s18 = Stock.create(day_id: d18.id, sector: "Autos", symbol: "TSLA", quantity: 5, price: 675.50)
s18s18 = Stock.create(day_id: d1818.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 121.26)

s19 = Stock.create(day_id: d19.id, sector: "Autos", symbol: "TSLA", quantity: 6, price: 675.50)
s19s19 = Stock.create(day_id: d1919.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 121.26)

s20 = Stock.create(day_id: d20.id, sector: "Autos", symbol: "TSLA", quantity: 10, price: 675.50)
s20s20 = Stock.create(day_id: d2020.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 121.26)

s21 = Stock.create(day_id: d21.id, sector: "Autos", symbol: "TSLA", quantity: 15, price: 718.43)
s21s21 = Stock.create(day_id: d2121.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 127.79)

s22 = Stock.create(day_id: d22.id, sector: "Autos", symbol: "TSLA", quantity: 15, price: 686.44)
s22s22 = Stock.create(day_id: d2222.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 125.12)

s23 = Stock.create(day_id: d23.id, sector: "Autos", symbol: "TSLA", quantity: 22, price: 653.20)
s23s23 = Stock.create(day_id: d2323.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 122.66)

s24 = Stock.create(day_id: d24.id, sector: "Autos", symbol: "TSLA", quantity: 35, price: 621.44)
s24s24 = Stock.create(day_id: d2424.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 120.13)

s25 = Stock.create(day_id: d25.id, sector: "Autos", symbol: "TSLA", quantity: 35, price: 597.95)
s25s25 = Stock.create(day_id: d2525.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 121.42)

s26 = Stock.create(day_id: d26.id, sector: "Autos", symbol: "TSLA", quantity: 35, price: 597.95)
s26s26 = Stock.create(day_id: d2626.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 121.42)

s27 = Stock.create(day_id: d27.id, sector: "Autos", symbol: "TSLA", quantity: 43, price: 582.19)
s27s27 = Stock.create(day_id: d2727.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 117.90)

s28 = Stock.create(day_id: d28.id, sector: "Autos", symbol: "TSLA", quantity: 43, price: 673.58)
s28s28 = Stock.create(day_id: d2828.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 121.09)

s29 = Stock.create(day_id: d29.id, sector: "Autos", symbol: "TSLA", quantity: 43, price: 668.06)
s29s29 = Stock.create(day_id: d2929.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 119.98)

s30 = Stock.create(day_id: d30.id, sector: "Autos", symbol: "TSLA", quantity: 43, price: 699.60)
s30s30 = Stock.create(day_id: d3030.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 121.96)

s31 = Stock.create(day_id: d31.id, sector: "Autos", symbol: "TSLA", quantity: 43, price: 693.73)
s31s31 = Stock.create(day_id: d3131.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 121.03)

s32 = Stock.create(day_id: d32.id, sector: "Autos", symbol: "TSLA", quantity: 43, price: 693.73)
s32s32 = Stock.create(day_id: d3232.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 121.03)

s33 = Stock.create(day_id: d33.id, sector: "Autos", symbol: "TSLA", quantity: 43, price: 693.73)
s33s33 = Stock.create(day_id: d3333.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 121.03)

s34 = Stock.create(day_id: d34.id, sector: "Autos", symbol: "TSLA", quantity: 43, price: 707.94)
s34s34 = Stock.create(day_id: d3434.id, sector: "Technology", symbol: "AAPL", quantity: 5, price: 123.99)
