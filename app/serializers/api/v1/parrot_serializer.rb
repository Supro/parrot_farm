class Api::V1::ParrotSerializer < Api::V1::ParrotIndexSerializer
  has_one :father, serializer: Api::V1::ParrotIndexSerializer, root: :parrots
  has_one :mother, serializer: Api::V1::ParrotIndexSerializer, root: :parrots

  has_many :childs, serializer: Api::V1::ParrotIndexSerializer, root: :parrots
end
