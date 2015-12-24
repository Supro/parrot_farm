# == Schema Information
#
# Table name: parrots
#
#  id         :integer          not null, primary key
#  name       :string
#  slug       :string
#  gender     :string
#  color      :string
#  age        :integer
#  pedigree   :boolean          default(FALSE)
#  father_id  :integer
#  mother_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_parrots_on_father_id  (father_id)
#  index_parrots_on_mother_id  (mother_id)
#

class Parrot < ActiveRecord::Base
  extend FriendlyId
  friendly_id :generated_unique_identifier, use: [:slugged, :finders]

  validates :color, :age, presence: true
  validates :gender, inclusion: { in: %w(m f) }

  belongs_to :father, class_name: 'Parrot', foreign_key: :father_id
  belongs_to :mother, class_name: 'Parrot', foreign_key: :father_id

  before_create :generate_name

  def childs
    find_childs
  end

  def is_male?
    gender.eql?('m')
  end

  def is_female?
    gender.eql?('f')
  end

  def generate_name
    if is_male?
      self.name = Random.first_name_female
    else
      self.name = Random.first_name_male
    end unless name.present?
  end

private

  def generated_unique_identifier
    # "#{name}-#{color}" Uncomment and delete next line if you need nice slugs like jonny-yellow
    ""
  end

  def find_childs
    is_male? ? Parrot.where(father_id: id) : Parrot.where(mother_id: id)
  end
end
