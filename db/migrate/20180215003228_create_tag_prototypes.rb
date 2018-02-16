class CreateTagPrototypes < ActiveRecord::Migration
  def change
    create_table :tag_prototypes do |t|
      t.references :tag, foreign_key: true
      t.references :prototype, foreign_key: true
      t.timestamps null: false
    end
  end
end
