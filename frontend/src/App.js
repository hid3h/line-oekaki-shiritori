import './App.css';
import { Button, Icon } from 'antd-mobile';
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const query                       = useQuery()
  const shareMode                   = query.get('share')
  const [loading, setLoading]       = useState(true)
  const [btnLoading, setBtnLoading] = useState(false)
  const [error, setError]           = useState(null)
  const canvasRef                   = useRef();
  
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

  async function startShiritori() {
    setBtnLoading(true)
    // 画像を保存してURL取得
    console.count(canvasRef.current.toDataURL())
    const res = await uploadImage(canvasRef.current.toDataURL())
    console.log('up snd', res.data)
    // ターゲットピッカーを開く
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
    // 送ったあとになにかメッセージだす？。line見てとか。
  }

  async function replyShiritori() {
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

  function ShareButton(props) {
    const loading = props.btnLoading
    if (props.shareMode) {
      return <Button type="primary" loading={loading} disabled={loading} onClick={replyShiritori}>絵をトークに送信</Button>
    }
    return <Button type="primary" loading={loading} disabled={loading} onClick={startShiritori}>友達とお絵かきしりとりを始める</Button>
  }

  console.count('render')
  return (
    <div className="App">
      <ShareButton shareMode={shareMode} btnLoading={btnLoading} />
      <SignatureCanvas
        ref={(ref) => {
          canvasRef.current = ref;
        }}
        dotSize={0.1}
        maxWidth={1}
        canvasProps={canvasProps()}
        backgroundColor='rgba(255,255,255)'
      />
        
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
