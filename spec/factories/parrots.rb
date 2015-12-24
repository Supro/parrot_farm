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

FactoryGirl.define do
  factory :parrot do
    gender "m"
    color "yellow"
    age 12
    pedigree false
  end

end
