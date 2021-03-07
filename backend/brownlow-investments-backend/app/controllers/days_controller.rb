class DaysController < ApplicationController
  skip_before_action :authorized

  def index
    days = Day.all
    render json: days
  end


  def totals
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
