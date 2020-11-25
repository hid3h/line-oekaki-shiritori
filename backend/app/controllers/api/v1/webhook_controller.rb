class Api::V1::WebhookController < ApplicationController
  def receive
    render :json => 'ok'
  end

  def test
    render :json => {test: 'oekaki2'}
  end
end
