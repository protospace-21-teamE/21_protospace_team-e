class PrototypesController < ApplicationController
  before_action :set_prototype, only: [:show, :edit, :update, :destroy]

  def index
    if params[:sort] == "0"
      prototype_ids = Like.group(:prototype_id).order('count_prototype_id DESC').count(:prototype_id).keys
      @liked_prototypes = prototype_ids.map { |id| Prototype.find(id) }
      @prototypes = Kaminari.paginate_array(@liked_prototypes).page(params[:page]).per(4)
    else
      @prototypes = Prototype.order('created_at DESC').page(params[:page]).per(4)
    end
  end

  def new
    @prototype = Prototype.new
    @prototype.captured_images.build
  end

  def create
    @prototype = Prototype.new(prototype_params)
    @prototype.tags << Tag.where(name: params[:tag][:name]).first_or_initialize
    if @prototype.save
      redirect_to :root, notice: 'New prototype was successfully created'
    else
      redirect_to ({ action: :new }), alert: 'New prototype was unsuccessfully created'
    end
  end

  def show
    @comment = Comment.new
    @comments = @prototype.comments.includes(:user)
    @like = @prototype.likes.where(user_id: current_user.id).first if user_signed_in?
    @tags = @prototype.tags
  end

  def edit
    @main = @prototype.captured_images[0]
    @sub = @prototype.captured_images.where(status: 1)
    @add = @prototype.captured_images.build
    @tags = @prototype.tags
  end

  def update
    # before_tag_list = []
    new_tag_list = []
    # after_tag_list = []

    # @prototype.tags.each do |tag|
    #   before_tag_list << tag.name
    # end

    params[:tags].each do |num, tag|
      new_tag_list << tag[:name]
    end
    # after_tag_list = (before_tag_list + new_tag_list).uniq

    @prototype.tags = []
    new_tag_list.each do |tag_name|
      @prototype.tags << Tag.where(name: tag_name).first_or_initialize unless tag_name ==""
    end
    # Tag.where(name: tag[:name]).first_or_initialize if tag[:name].present?
    # @prototype.tags.uniq

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
