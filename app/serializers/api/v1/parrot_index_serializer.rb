class Api::V1::ParrotIndexSerializer < ActiveModel::Serializer
  attributes :id, :name, :slug, :gender, :color, :age, :pedigree
end
