import StimulusController from "./stimulus_controller"
import liff from '@line/liff';
import SignaturePad from 'signature_pad'

export default class extends StimulusController {

  static targets = [ "canvas" ]

  initialize() {
    // 二回走ってる。
    // if (!document.documentElement.hasAttribute("data-turbo-preview")) {
    //   this.setChart()
    // }
    const myLiffId = this.liffId()
    this.initializeLiff(myLiffId);

    this.initSignaturePad(this.canvasTarget)
  }

  initSignaturePad(canvas) {
    let tempWidth = window.innerWidth;

    if (tempWidth > maxWidth) {
      tempWidth = maxWidth;
    }

    const h = tempWidth;
    const w = tempWidth;

    canvas.width = w;
    canvas.height = h;
    
    new SignaturePad(canvas);
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
        window.alert(err)
      });
  }

  sendTalk() {
    const url = "/images"
    const data = {imageData: this.canvasTarget.toDataURL('image/jpeg')}

    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRF-Token': this.csrf_token(),
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
    })
    .then(response => response.json())
    .then((data) => {
      const imageUrl = `${this.currentBaseUrl()}/uploads/` + data.imageFileName

      const imageMessage = {
        type:               "image",
        originalContentUrl: imageUrl,
        previewImageUrl:    imageUrl
      }
      const uriMessage = {
        type: 'text',
        text: this.liffUrl()
      }
      this.sendImageAndMessage(
        imageMessage,
        uriMessage
      )
    })
    .catch((err) => {
      window.alert("err" + err)
    })
  }

  sendImageAndMessage(imageMessage, textMessage) {
    liff.sendMessages([
      imageMessage,
      textMessage
    ])
    .then(() => {
      window.alert("送信成功")
    })
    .catch((e) => {
      window.alert(e)
    })
  }

  liffId() {
    return process.env.REACT_APP_LIFF_ID
  }

  liffUrl() {
    return `https://liff.line.me/${this.liffId()}`
  }

  currentBaseUrl() {
    const location = window.location
    return `${location.protocol}//${location.host}`
  }
}
