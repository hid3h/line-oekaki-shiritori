import liff from "@line/liff"

export async function initLiff() {
  console.log('init start', liff.id)
  alert('init start')
  await liff.init({
      liffId: process.env.REACT_APP_LIFF_ID
    })
  console.log('init end', liff.id)
  alert('init end')
  return liff
}

export async function sendLineMessage(messages) {
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
