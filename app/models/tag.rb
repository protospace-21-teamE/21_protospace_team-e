class Tag < ActiveRecord::Base
  has_many :prototypes, through: :tag_prototypes
  has_many :tag_prototypes
end
