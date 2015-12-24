class Api::V1::ParrotsController < Api::V1::ApiController
  before_action :find_parrot, only: [:show, :update]

  def index
    parrots = Parrot.search(params)
    render json: parrots,
           each_serializer: Api::V1::ParrotIndexSerializer,
           include: params[:include],
           meta: { page:          parrots.current_page,
                   per_page:      (params[:per_page] || Parrot.default_per_page).to_i,
                   total_pages:   parrots.total_pages }
  end

  def show
    render json: @parrot,
           serializer: Api::V1::ParrotSerializer,
           include: params[:include]
  end

  def create
    @parrot = Parrot.new create_params
    if @parrot.save
      render json: @parrot,
             serializer: Api::V1::ParrotSerializer,
             include: params[:include]
    else
      render json: { errors: @parrot.errors }, status: :bad_request
    end
  end

  def update
    if @parrot.update(update_params)
      render json: @parrot,
             serializer: Api::V1::ParrotSerializer,
             include: params[:include]
    else
      render json: { errors: @parrot.errors }, status: :bad_request
    end
  end

private

  def find_parrot
    @parrot = Parrot.find(params[:id])
  end

  def create_params
    params.require(:parrot).permit(:color, :gender, :age, :father_id, :mother_id)
  end

  alias_method :update_params, :create_params
end
