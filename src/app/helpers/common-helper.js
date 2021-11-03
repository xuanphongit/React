export const dataURIToBlob = dataURI => {
  const byteString = atob(dataURI)

  const mimeString = "image/png"

  const ia = new Uint8Array(byteString.length)

  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i)

  return new Blob([ia], { type: mimeString })
}
