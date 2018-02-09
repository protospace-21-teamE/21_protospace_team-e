class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :comment, null: false
      t.references :user, null: false, foreign_key: true
      t.references :prototype, null: false, foreign_key: true, index: true
      t.timestamps null: false
    end
  end
end
