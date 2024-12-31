# frozen_string_literal: true

module Game
  class ApplicationController < ActionController::Base
    # layout "layouts/game/application"

    allow_browser versions: :modern
  end
end
