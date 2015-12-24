require 'rails_helper'

RSpec.describe Api::V1::ParrotsController, type: :controller do
  let(:json){ JSON.parse(response.body, symbolize_names: true) }
  let(:parrot) { create :parrot }

  describe "GET #index" do
    before do
      3.times do
        create :parrot
      end
    end

    it "returns user json" do
      get :index, per_page: 1, page: 2
      expect(response).to be_success
      expect(json[:meta][:page]).to eq 2
      expect(json[:meta][:per_page]).to eq 1
      expect(json[:meta][:total_pages]).to eq 3
    end
  end

  describe "GET #show" do
    it "returns user json" do
      get :show, id: parrot.id
      expect(response).to be_success
      expect(json[:data][:id]).to eql parrot.id.to_s
      expect(json[:data][:type]).to eql "parrots"
    end
  end

  describe "POST #create" do
    let(:attributes) { attributes_for :parrot }

    it "returns http success" do
      post :create, parrot: attributes
      expect(response).to be_success
      expect(json[:data][:attributes][:color]).to eq attributes[:color]
    end
  end

  describe "PUT #update" do
    let(:attributes) { attributes_for(:parrot).merge({ color: 'Green' }) }

    it "returns http success" do
      put :update, id: parrot.id, parrot: attributes
      expect(response).to have_http_status(:success)
      expect(json[:data][:attributes][:color]).to eq attributes[:color]
    end
  end
end
