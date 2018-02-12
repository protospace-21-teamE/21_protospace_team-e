class LikesController < ApplicationController

  def create
    Like.create(like_params)
    flash[:notice] = 'Liked this prototype'
    # binding.pry
    respond_to do |format|
      format.html {redirect_to prototype_path(id: params[:prototype_id])}
      format.json
    end
  end

  def destroy
    Like.destroy(params[:id])
    flash[:notice] = 'Unliked this prototype'
    redirect_to prototype_path(id: params[:prototype_id])
  end

  private

  def like_params
    params.permit(:prototype_id).merge(user_id: current_user.id)
  end

end
