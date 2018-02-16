class TagsController < ApplicationController

  def index
    @tags = Tag.all
  end

  def show
    @tag = Tag.find(params[:id])
    @prototypes = @tag.prototypes.page(params[:page]).per(4)
  end

end
