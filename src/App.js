import logo from './logo.svg';
import './App.css';
import { Button } from 'antd-mobile';
import { useEffect } from 'react';
import liff from '@line/liff';
import { useLocation } from 'react-router-dom';

function initializeLiff(myLiffId) {
  liff
    .init({
      liffId: myLiffId
    })
    .then(() => {
      // alert('liff初期化成功です')
    })
    .catch((err) => {
      alert('liffアプリ初期化エラー', err)
    });
}

function sendMessage(messages) {
  liff.sendMessages(messages)
    .then(() => {
      console.log('message sent');
    })
    .catch((err) => {
      console.log('error', err);
    });
}

function shareaTargetPicker(messages) {
  liff.shareTargetPicker(messages)
    .then((res) => {
      if (res) {
        console.log(`[${res.status}] Message sent!`)
      }
    })
    .catch((err) => {
      // バツで閉じたりしたとき
    })
}

function startShiritori() {
  // TODO: ここで絵の画像も送る？
  const message = {
    type: 'text',
    text: 'お絵かきしりとりを始めませんか'
  }
  const imageMessage = {
    "type": "image",
    "originalContentUrl": "https://example.com/original.jpg",
    "previewImageUrl": "https://example.com/preview.jpg"
  }
  const uriMessage = {
    type: 'text',
    text: 'https://liff.line.me/1655261379-gGzn8K3e?share=true'
  }

  shareaTargetPicker([message, imageMessage, uriMessage])
  // 送ったあとになにかメッセージだしたい。line見てとか。
}

function replyShiritori() {
  const imageMessage = {
    "type": "image",
    "originalContentUrl": "https://example.com/original.jpg",
    "previewImageUrl": "https://example.com/preview.jpg"
  }
  const uriMessage = {
    type: 'text',
    text: '絵をかく -> https://liff.line.me/1655261379-gGzn8K3e?share=true'
  }
  sendMessage([imageMessage, uriMessage])
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const query = useQuery()
  const shareMode = query.get('share')
  
  useEffect(() => {
    console.log('useEffect')
    initializeLiff(process.env.REACT_APP_LIFF_ID)
  }, []);

  return (
    <div className="App">
      <ShareButton shareMode={shareMode} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function ShareButton(props) {
  if (props.shareMode) {
    return <Button type="primary" onClick={replyShiritori}>絵をトークに送信</Button>
  }
  return <Button type="primary" onClick={startShiritori}>友達とお絵かきしりとりを始める</Button>
}

export default App;
