import liff from "@line/liff"

export async function initLiff() {
  console.log('init start')
  await liff.init({
      liffId: process.env.REACT_APP_LIFF_ID
    })
  console.log('init end')
}

export async function sendLineMessage(messages) {
  return await liff.sendMessages(messages)
}

export function closeLiffWindow() {
  liff.closeWindow()
}
