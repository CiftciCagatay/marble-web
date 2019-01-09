export const ROOT_URL = process.env.REACT_APP_ROOT_URL

export const BPM_PORT = process.env.REACT_APP_BPM_PORT
const AUTH_PORT = process.env.REACT_APP_AUTH_PORT
const NOTIFICATION_PORT = process.env.REACT_APP_NOTIFICATION_PORT

export const issueServiceUrl = `${ROOT_URL}:${BPM_PORT}/issues`
export const issueEventServiceUrl = `${ROOT_URL}:${BPM_PORT}/issueEvents`
export const labelServiceUrl = `${ROOT_URL}:${BPM_PORT}/labels`
export const categoryServiceUrl = `${ROOT_URL}:${BPM_PORT}/categories`
export const unitServiceUrl = `${ROOT_URL}:${BPM_PORT}/units`
export const fileServiceUrl = `${ROOT_URL}:${BPM_PORT}/files`

export const userServiceUrl = `${ROOT_URL}:${AUTH_PORT}/users`
export const authenticationServiceUrl = `${ROOT_URL}:${AUTH_PORT}/auth`

export const notificationServiceUrl = `${ROOT_URL}:${NOTIFICATION_PORT}/notifications`

export const feedbackServiceUrl = `${ROOT_URL}:${BPM_PORT}/feedback`
