class CommentsController < ApplicationController

  before_action :move_to_sign_in

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private
  def move_to_sign_in
    redirect_to "/users/sign_in" unless user_signed_in?
  end
end
