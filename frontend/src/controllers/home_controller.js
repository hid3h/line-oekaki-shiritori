import StimulusController from "./stimulus_controller"

export default class extends StimulusController {

  initialize() {
    // 二回走ってる。
    // if (!document.documentElement.hasAttribute("data-turbo-preview")) {
    //   this.setChart()
    // }
    this.sayHello()
  }

  sayHello() {
    console.count('heloooo')
  }

}
