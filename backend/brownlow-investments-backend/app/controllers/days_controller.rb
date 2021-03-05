class DaysController < ApplicationController
  skip_before_action :authorized

  def index
    empty = [] 

    today = Time.now.to_s.split(" ")[0]
    todayArr = today.split("-")
    today = DateTime.new(todayArr[0].to_i,todayArr[1].to_i,todayArr[2].to_i)
    

    all = Day.all
    first = Day.all.first.date
    last = today
    if first == nil 
      render json: empty
    else
      start = first.to_s.split(" ")[0]
      finish = last.to_s.split("T")[0]
      dates = generate_date_range(start,finish)
      dates.each do |day|
        dayArr = day.split("-")   
        x = DateTime.new(dayArr[0].to_i,dayArr[1].to_i,dayArr[2].to_i)
        all.each do |dbDay|
        end
        puts x == today
      end
      render json: dates
    end
  end

  def create
    byebug
  end


  #helpers

  def valid_date?(dt)
    begin
      Date.parse(dt)
      true
    rescue => e
      false
    end
  end

  def generate_date_range(first, last)
    first, last = "", first unless last
    if last.nil? || last.empty?
      last = (Time.now - 1.day).in_time_zone('Kolkata').strftime("%Y-%m-%d")
    end
    if first.empty?
      first = Time.strptime(last, "%Y-%m-%d").in_time_zone('Kolkata').beginning_of_month.strftime("%Y-%m-%d")
    end
    (first..last).select { |d|  valid_date?(d) }
  end
end
