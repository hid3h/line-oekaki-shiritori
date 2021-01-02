export function currentBaseUrl() {
  const location = window.location
  return `${location.protocol}//${location.host}`
}

export function isNgrok() {
  const host = window.location.host
  return host.includes('ngrok')
}
