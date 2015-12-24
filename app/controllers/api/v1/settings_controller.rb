class Api::V1::SettingsController < Api::V1::ApiController
  def index
    render json: { colors: Parrot.distinct(:color).pluck(:color) }
  end
end
