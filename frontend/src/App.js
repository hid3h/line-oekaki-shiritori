import './App.css';
import { Button } from 'antd-mobile';
import { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas'
import { uploadImage } from './api/Image';
import { initLiff, closeLiffWindow, sendLineMessage } from './api/LiffApi';
import { currentBaseUrl } from './Util';

function App() {
  const [btnLoading, setBtnLoading] = useState(false)
  const canvasRef                   = useRef();

  useEffect(() => {
    console.count('useEffect start')
    initLiff()
    console.count('useEffect end')
  }, []);

  async function replyShiritori() {
    setBtnLoading(true)

    const res = await uploadImage(canvasRef.current.toDataURL())
    const fileName = res.data.key
    const imageUrl = `${currentBaseUrl()}/uploads/` + fileName

    const imageMessage = {
      type: "image",
      originalContentUrl: imageUrl,
      previewImageUrl: imageUrl
    }
    const uriMessage = {
      type: 'text',
      text: 'https://liff.line.me/1655261379-gGzn8K3e'
    }
    await sendLineMessage([imageMessage, uriMessage])

    setBtnLoading(false)
    closeLiffWindow()
  }

  function ShareButton(props) {
    const loading = props.btnLoading
    return <Button
      className="send-talk"
      loading={loading}
      disabled={loading}
      onClick={replyShiritori}
    >絵をトークに送信</Button>
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
