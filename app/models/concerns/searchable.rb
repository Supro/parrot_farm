module Searchable
  extend ActiveSupport::Concern

  module ClassMethods
    def search(params)
      parrots = Parrot.where(create_filters(params))
      parrots = parrots.where("name LIKE :name", name: "%#{params[:name]}%") if params[:name].present?
      parrots = parrots.where("slug LIKE :slug", slug: "%#{params[:slug]}%") if params[:slug].present?

      parrots.page(params[:page])
             .per(params[:per_page])
    end

  private

    def create_filters(params)
      {}.tap do |hash|
        hash[:pedigree] = true if params[:pedigree].present?
        hash[:age] = params[:age] if params[:age].present?
        hash[:color] = params[:color] if params[:color].present?
        hash[:gender] = params[:gender] if params[:gender].present?
      end
    end
  end
end
