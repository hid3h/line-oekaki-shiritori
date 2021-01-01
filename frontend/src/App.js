import './App.css';
import { Button } from 'antd-mobile';
import { useEffect, useRef, useState } from 'react';
import liff from '@line/liff';
import SignatureCanvas from 'react-signature-canvas'
import { uploadImage } from './api/image';

function sendMessage(messages, callback) {
  liff.sendMessages(messages)
    .then(() => {
      callback()
    })
    .catch((err) => {
      alert(`送信エラー: ${err.message}`)
    });
}

function App() {
  const [btnLoading, setBtnLoading] = useState(false)
  const canvasRef                   = useRef();
  
  useEffect(() => {
    console.count('renderのあとuseEffect')
    liff
      .init({
        liffId: process.env.REACT_APP_LIFF_ID
      })
      .then(() => {
    　  console.count('init成功')
      })
      .catch((err) => {
        alert(`liffアプリ初期化エラー: ${err.message}`)
      })
  }, []);

  async function replyShiritori() {
    setBtnLoading(true)

    const res = await uploadImage(canvasRef.current.toDataURL())
    const fileName = res.data.key
    const imageUrl = 'https://d27ubz7sb3sg5u.cloudfront.net/uploads/' + fileName

    const imageMessage = {
      type: "image",
      originalContentUrl: imageUrl,
      previewImageUrl: imageUrl
    }
    const uriMessage = {
      type: 'text',
      text: 'https://liff.line.me/1655261379-gGzn8K3e'
    }
    sendMessage([imageMessage, uriMessage], () => {
      setBtnLoading(false)
      liff.closeWindow()
    })
  }

  function ShareButton(props) {
    const loading = props.btnLoading
    return <Button className="send-talk" loading={loading} disabled={loading} onClick={replyShiritori}>絵をトークに送信</Button>
  }

  function onClickUndo() {
    const data = canvasRef.current.toData();

    if (data) {
      data.pop(); // remove the last dot or line
      canvasRef.current.fromData(data);
    }
  }

  console.count('render')
  return (
    <div className="app">
      <Button type="primary" onClick={onClickUndo}>ひとつ戻す</Button>
      <SignatureCanvas
        ref={(ref) => {
          canvasRef.current = ref;
        }}
        dotSize={0.1}
        maxWidth={1}
        canvasProps={canvasProps()}
        backgroundColor='rgba(255,255,255)'
      />
      <ShareButton btnLoading={btnLoading} />
    </div>
  );
}

function canvasProps() {
  let tempWidth = window.innerWidth;
  const maxWidth = 600;
  if (tempWidth > maxWidth) {
    tempWidth = maxWidth;
  }

  const h = tempWidth;
  const w = tempWidth;
  return {width: w, height: h, className: 'sigCanvas'}
}

export default App;
