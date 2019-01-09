import { fileServiceUrl } from './config'

export const uploadImage = (token, data, onProgress) => {
  var req = new XMLHttpRequest()

  req.upload.addEventListener('progress', function(ev) {
    onProgress(ev.loaded / ev.total)
  })

  req.open('post', fileServiceUrl)

  req.setRequestHeader('Authorization', token)
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
