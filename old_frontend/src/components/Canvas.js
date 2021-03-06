import { useEffect, useRef } from "react"
import SignaturePad from "signature_pad"

const maxWidth = 600;

export default function Canvas() {
  const canvasEl = useRef(null)

  useEffect(() => {
    const canvas = canvasEl.current

    let tempWidth = window.innerWidth;

    if (tempWidth > maxWidth) {
      tempWidth = maxWidth;
    }

    const h = tempWidth;
    const w = tempWidth;

    canvas.width = w;
    canvas.height = h;

    const signaturePad = new SignaturePad(canvas)
    signaturePad.dotSize = 0.1
    signaturePad.maxWidth = 1
  }, [])

  return (
    <div className="canvas">
      <canvas ref={canvasEl}></canvas>
    </div>
  )
}
