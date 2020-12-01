import './App.css';
import { Button } from 'antd-mobile';
import { useEffect, useRef, useState } from 'react';
import liff from '@line/liff';
import { useLocation } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas'
import Axios from 'axios'

async function uploadImage(data) {
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:2001/api/v1/' : '/api/v1/'
  try {
    const response = await Axios.post(baseUrl + 'images', {
      data: data,
    });
    console.log(response);
    return response
  } catch (error) {
    console.error(error);
  }
}

function sendMessage(messages, callback) {
  liff.sendMessages(messages)
    .then(() => {
      callback()
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const query                       = useQuery()
  const startMode                   = query.get('start')
  const [btnLoading, setBtnLoading] = useState(false)
  const canvasRef                   = useRef();
  
  useEffect(() => {
    console.count('renderのあとuseEffect')
    liff
      .init({
        liffId: process.env.REACT_APP_LIFF_ID
      })
      .then(() => {
      })
      .catch((err) => {
        alert('liffアプリ初期化エラー', err)
      })
  }, []);

  async function startShiritori() {
    setBtnLoading(true)

    const res = await uploadImage(canvasRef.current.toDataURL())
    const fileName = res.data.key

    // ターゲットピッカーを開く
    const message = {
      type: 'text',
      text: 'お絵かきしりとりを始めませんか'
    }
    const imageUrl = 'https://d27ubz7sb3sg5u.cloudfront.net/img/' + fileName
    const imageMessage = {
      "type": "image",
      "originalContentUrl": imageUrl,
      "previewImageUrl": imageUrl
    }
    const uriMessage = {
      type: 'text',
      text: 'https://liff.line.me/1655261379-gGzn8K3e'
    }
  
    shareaTargetPicker([message, imageMessage, uriMessage])

    setBtnLoading(false) // 一旦ここに
  }

  async function replyShiritori() {
    setBtnLoading(true)

    const res = await uploadImage(canvasRef.current.toDataURL())
    const fileName = res.data.key
    const imageUrl = 'https://d27ubz7sb3sg5u.cloudfront.net/img/' + fileName

    const imageMessage = {
      "type": "image",
      "originalContentUrl": imageUrl,
      "previewImageUrl": imageUrl
    }
    const uriMessage = {
      type: 'text',
      text: '絵をかく -> https://liff.line.me/1655261379-gGzn8K3e'
    }
    sendMessage([imageMessage, uriMessage], () => {
      setBtnLoading(false)
      liff.closeWindow()
    })
  }

  function ShareButton(props) {
    const loading = props.btnLoading
    if (!props.startMode) {
      return <Button type="primary" loading={loading} disabled={loading} onClick={replyShiritori}>絵をトークに送信</Button>
    }
    return <Button type="primary" loading={loading} disabled={loading} onClick={startShiritori}>友達とお絵かきしりとりを始める</Button>
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
      <ShareButton startMode={startMode} btnLoading={btnLoading} />
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
