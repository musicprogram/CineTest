class DaysController < ApplicationController
	def index
    @days = Day.all
    render json: @days
  end

  def create
    @day = Day.create(day_params)
    render json: @day
  end

  def show
    @day = Day.find(params[:id])

    if stale?(last_modified: @day.updated_at) # muy importante
      render json: @day
    end
  end

  def destroy #destruir 
    @day = Day.find(params[:id])
    if @day.destroy
      head :no_content, status: :ok
    else
       render json: @day.errors, status: :unprocessable_entity
    end
  end

  private

  def day_params
    params.require(:day).permit(:day_name)
  end
end
