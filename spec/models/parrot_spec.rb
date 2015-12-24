require 'rails_helper'

RSpec.describe Parrot, type: :model do
  let(:parrot) { create :parrot }

  it "validations" do
    should validate_inclusion_of(:gender).in_array(%w(m f))
    should validate_presence_of(:age)
    should validate_presence_of(:color)
  end

  it "relations" do
    should belong_to(:father)
    should belong_to(:mother)
  end

  context "friendly_id" do
    let(:parrot) { create :parrot, name: 'Jonny', color: 'yellow' }
    let(:second_parrot) { create :parrot, name: 'Jonny', color: 'yellow' }

    it "should generate right slugs" do
      expect(parrot.slug).to_not eq second_parrot.slug

      # Uncomment to test slug generation
      # expect(parrot.slug).to eq 'jonny-yellow'
      # expect(second_parrot.slug).to eq 'jonny-blue'
      # expect(third_parrot.slug).to_not eq 'jonny-blue'
      # expect(third_parrot.slug) =~ 'jonny-blue'
    end
  end

  describe "instance methods" do

    context "#childs" do
      before do
        2.times do |time|
          create :parrot, father_id: parrot.id
        end
      end

      it "father should return 2 sons" do
        expect(parrot.childs.count).to eq 2
      end
    end

    it "#is_male?" do
      expect(parrot.is_male?).to be_truthy
    end

    it "#is_female?" do
      expect(parrot.is_female?).to be_falsey
    end

    context "#generate_name" do
      expect(parrot.name).to_not be_nil
    end
  end
end
