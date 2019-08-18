class DaysController < ApplicationController

	def create
    @day = Day.create(day_params)
    render json: @day
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
