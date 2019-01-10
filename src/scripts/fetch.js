import { store } from '../App'
import { LOGGED_OUT, ACCESS_TOKEN_REFRESHED } from '../actions'
import { refresh, authenticationServiceUrl } from '../api'

export default (...params) => {
  return fetch(...params).then(response => {
    if (response.ok) {
      return Promise.resolve(response)
    } else if (response.status === 403) {
      return Promise.reject(new Error('Yetkisiz erişim.'))
    } else if (response.status === 401) {
      if (response.url === `${authenticationServiceUrl}/refresh`) {
        // Logout
        // Refresh token expired too. Session is not valid anymore
        store.dispatch({ type: LOGGED_OUT })
        return Promise.reject(new Error('Unauthorized Access'))
      }

      // Access token expired
      // Try to refresh it
      const {
        auth: { refreshToken }
      } = store.getState()

      refresh({ refreshToken })
        .then(response => response.json())
        .then(({ accessToken }) => {
          // Access token refreshed
          store.dispatch({
            type: ACCESS_TOKEN_REFRESHED,
            payload: { accessToken }
          })

          // Repeat prev request with refreshed token
          const { options, url, ...restParams } = params
          return fetch(
            url,
            {
              ...options,
              headers: { ...options.headers, Authorization: accessToken }
            },
            ...restParams
          )
        })
    }

    return Promise.reject(new Error('Sunucuya erişilemedi.'))
  })
}
