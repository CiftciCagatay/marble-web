import { store } from '../App'
import { LOGGED_OUT, ACCESS_TOKEN_REFRESHED } from '../actions'
import { refresh, authenticationServiceUrl } from '../api'

function configureFetch() {
  let refreshingTokenPromise = null

  return (...params) => {
    if (refreshingTokenPromise !== null) {
      return refreshingTokenPromise
        .then(() => fetch(...params))
        .catch(() => fetch(...params))
    }

    return fetch(...params).then(response => {
      if (response.ok) {
        return Promise.resolve(response)
      }

      if (response.status === 401) {
        if (response.url === `${authenticationServiceUrl}/refresh`) {
          // Logout
          // Refresh token expired too. Session is not valid anymore
          store.dispatch({ type: LOGGED_OUT })
          return Promise.reject(new Error('Unauthorized Access'))
        }

        if (refreshingTokenPromise === null) {
          const {
            auth: { refreshToken }
          } = store.getState()

          refreshingTokenPromise = new Promise((resolve, reject) => {
            refresh({ refreshToken })
              .then(response => response.json())
              .then(({ accessToken }) => {
                // Access token refreshed
                store.dispatch({
                  type: ACCESS_TOKEN_REFRESHED,
                  payload: { accessToken }
                })

                refreshingTokenPromise = null

                resolve()
              })
              .catch(error => {
                refreshingTokenPromise = null
                reject(error)
              })
          })
        }

        return refreshingTokenPromise.then(() => {
          // Repeat prev request with refreshed token
          const {
            auth: { accessToken }
          } = store.getState()

          const url = params[0]
          const { headers, ...restOptions } = params[1]
          return fetch(url, {
            headers: { ...headers, Authorization: accessToken },
            ...restOptions
          })
        })
      } else {
        return Promise.reject(new Error('Sunucuya erişilemedi.'))
      }
    })
  }
}

export default configureFetch()
