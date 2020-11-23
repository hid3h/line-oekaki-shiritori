import './App.css';
import { Button, Icon } from 'antd-mobile';
import { useEffect, useState } from 'react';
import liff from '@line/liff';
import { useLocation } from 'react-router-dom';
import Canvas from './components/Canvas';

function sendMessage(messages) {
  liff.sendMessages(messages)
    .then(() => {
      alert('トークにもどれ的なメッセージ');
    })
    .catch((err) => {
      alert('error', err);
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    console.count('useEffect')
    liff
      .init({
        liffId: process.env.REACT_APP_LIFF_ID
      })
      .then(() => {
        setLoading(false)
      })
      .catch((err) => {
        alert('liffアプリ初期化エラー', err)
        setError('error')
        setLoading(false)
      })
  }, []);

  if (loading) return <Icon type = "loading" />;
  if (error) return <p>{error}</p>;

  return (
    <div className="App">
      <ShareButton shareMode={shareMode} />
      <Canvas />
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
