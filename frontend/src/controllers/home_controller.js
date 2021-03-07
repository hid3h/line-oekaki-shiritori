import StimulusController from "./stimulus_controller"
import liff from '@line/liff';
import SignaturePad from 'signature_pad'

export default class extends StimulusController {

  initialize() {
    // 二回走ってる。
    // if (!document.documentElement.hasAttribute("data-turbo-preview")) {
    //   this.setChart()
    // }
    const myLiffId = process.env.REACT_APP_LIFF_ID
    this.initializeLiff(myLiffId);

    const canvas = document.querySelector("canvas");
    this.initSignaturePad(canvas)
  }

  initSignaturePad(canvas) {

    const signaturePad = new SignaturePad(canvas);
    console.log('yeeee', canvas)
  }

  initializeLiff(myLiffId) {
    liff
      .init({
        liffId: myLiffId
      })
      .then(() => {
        // start to use LIFF's api
        console.count("start to use LIFF's api")
        // initializeApp();
      })
      .catch((err) => {
        document.getElementById("liffAppContent").classList.add('hidden');
        document.getElementById("liffInitErrorMessage").classList.remove('hidden');
      });
  }

  sendTalk() {
    const canvas = document.querySelector("canvas");
    console.log('canvas', canvas)
    console.log('canvas.toDataUrl(', canvas.toDataURL())
    const uriMessage = {
      type: 'text',
      text: 'テスト固定メッセージ'
    }
    // liff.sendMessages([uriMessage])
    //   .then(() => {
    //     window.alert("送信成功")
    //   })
    //   .catch((e) => {
    //     window.alert(e)
    //   })
  }

  // onClickSendMessage() {
  //   const uriMessage = {
  //     type: 'text',
  //     text: 'テスト固定メッセージ'
  //   }
  //   const messages = [uriMessage]
  //   await sendLineMessage(messages)
  //   closeLiffWindow()
  // }
}
