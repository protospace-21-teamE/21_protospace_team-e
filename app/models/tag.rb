class Tag < ActiveRecord::Base
  has_many :prototypes, through: :tag_prototypes
end
