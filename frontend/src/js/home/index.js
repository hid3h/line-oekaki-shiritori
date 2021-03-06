import liff from '@line/liff';
import { 
  sendLineMessage,
  closeLiffWindow
} from '../liff-api';

window.onload = function() {
  console.count('start onload')
  const myLiffId = process.env.REACT_APP_LIFF_ID
  initializeLiff(myLiffId);
}

function initializeLiff(liffId) {
  liff
    .init({
      liffId: liffId
    })
    .then(() => {
      // start to use LIFF's api
      console.log('init成功')
      initializeApp();
    })
    .catch((err) => {
      console.log('err', err)
      alert(err)
      // document.getElementById("liffAppContent").classList.add('hidden');
      // document.getElementById("liffInitErrorMessage").classList.remove('hidden');
    });
}

function initializeApp() {
  document.getElementById("liff-content").style.display = 'block'

  document.getElementById("send")
    .addEventListener(
      'click',
      onClickSendMessage,
      false
    );
}

async function onClickSendMessage() {
  const uriMessage = {
    type: 'text',
    text: 'テスト固定メッセージ'
  }
  const messages = [uriMessage]
  await sendLineMessage(messages)
  closeLiffWindow()
}
