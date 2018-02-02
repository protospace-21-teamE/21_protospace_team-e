class PrototypesController < ApplicationController
  before_action :set_prototype, only: :show

  def index
    @prototypes = Prototype.page(params[:page]).per(16)
  end

  def new
    @prototype = Prototype.new
    @prototype.captured_images.build
  end

  def create
    @prototype = Prototype.new(prototype_params)
    if @prototype.save
      redirect_to :root, notice: 'New prototype was successfully created'
    else
      redirect_to ({ action: :new }), alert: 'New prototype was unsuccessfully created'
     end
  end

  def show
  end

  def edit
    @prototype = Prototype.find(params[:id])
    @main = @prototype.captured_images[0]
    @sub = @prototype.captured_images.where(status: 1)
  end

  def update
    prototype = Prototype.find(params[:id])
    prototype.update(prototype_params)
    redirect_to action: :show, notice: 'Edited prototype was successfully saved'
  end

  def destroy
    @prototype = Prototype.find(params[:id])
    if @prototype.user_id == current_user.id
      @prototype.destroy
    end
  end

  private

  def set_prototype
    @prototype = Prototype.find(params[:id])
  end

  def prototype_params
    params.require(:prototype).permit(
      :title,
      :catch_copy,
      :concept,
      :user_id,
      captured_images_attributes: [:id, :content, :status]
    )
  end
end
