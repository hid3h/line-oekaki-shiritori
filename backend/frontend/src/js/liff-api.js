import liff from "@line/liff"

export async function initLiff() {
  console.log('init start', liff.id)
  alert('init start')
  await liff.init({
      liffId: process.env.LIFF_ID
    })
  console.log('init end', liff.id)
  alert('init end')
  return liff
}

export async function sendLineMessage() {
  const uriMessage = {
    type: 'text',
    text: 'https://liff.line.me/1655261379-gGzn8K3e'
  }
  const messages = [uriMessage]
  try {
    const result = await liff.sendMessages(messages)
    console.log('re', result)
    return result
  } catch (err) {
    alert(`${err.code}: ${err.message}`)
  }
}

export function closeLiffWindow() {
  liff.closeWindow()
}
