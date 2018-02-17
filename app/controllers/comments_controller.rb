class CommentsController < ApplicationController

  before_action :move_to_sign_in

  def new
  end

  def create
    @comment = Comment.create(comment: comment_params[:comment], prototype_id: comment_params[:prototype_id], user_id: current_user.id)
    respond_to do |format|
      format.html {redirect_to prototype_path(params[:prototype_id])}
      format.json
    end
  end

  def edit
    @comment = Comment.find(params[:id])
  end

  def update
    # binding.pry
    @comment = Comment.find(params[:id])
    # @comment.update(comment_params)
    @comment.update(update_params)
    respond_to do |format|
      format.html {redirect_to prototype_path(params[:prototype_id])}
      format.json
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy if @comment.user_id == current_user.id
    flash[:notice] = "Delete your comment completed"
    respond_to do |format|
      format.html {redirect_to prototype_path(params[:prototype_id])}
      format.json
    end
  end

  private
  def move_to_sign_in
    redirect_to "/users/sign_in" unless user_signed_in?
  end

  def comment_params
    params.permit(:comment, :prototype_id)
  end

  def update_params
    params.require(:comment).permit(:comment).merge(prototype_id: params[:prototype_id])
  end
end
