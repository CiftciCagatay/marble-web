import { fileServiceUrl } from './config'

export const uploadImage = (accessToken, data, onProgress) => {
  var req = new XMLHttpRequest()

  req.upload.addEventListener('progress', function(ev) {
    if (onProgress) {
      onProgress(ev.loaded / ev.total)
    }
  })

  req.open('post', fileServiceUrl)

  req.setRequestHeader('Authorization', accessToken)
  req.send(data)

  return new Promise((resolve, reject) => {
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        return resolve(req.response)
      }
    }

    req.onerror = () => reject()
  })
}
