class CreateParrots < ActiveRecord::Migration
  def change
    create_table :parrots do |t|
      t.string :name
      t.string :slug, unique: true
      t.string :gender
      t.string :color
      t.integer :age
      t.boolean :pedigree, default: false

      t.references :father, index: true
      t.references :mother, index: true

      t.timestamps null: false
    end
  end
end
