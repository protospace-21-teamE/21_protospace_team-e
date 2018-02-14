class PrototypesController < ApplicationController
  before_action :set_prototype, only: [:show, :edit, :update, :destroy]

  def index
    prototype_ids = Like.group(:prototype_id).order('count_prototype_id DESC').count(:prototype_id).keys
    @popular_prototypes = prototype_ids.map { |id| Prototype.find(id) }
    @prototypes = Prototype.page(params[:page]).per(4)
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
    @comment = Comment.new
    @comments = @prototype.comments.includes(:user)
    @like = @prototype.likes.where(user_id: current_user.id).first
  end

  def edit
    @main = @prototype.captured_images[0]
    @sub = @prototype.captured_images.where(status: 1)
    @add = @prototype.captured_images.build
  end

  def update
    @prototype.update(prototype_params)
    flash[:notice] = 'Edited prototype was successfully saved'
    redirect_to action: :show
  end

  def destroy
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
