import { Controller } from "stimulus"

export default class StimulusController extends Controller {

  csrf_token() {
    return document.getElementsByName('csrf-token')[0].content
  }
}
