export const ROOT_URL = process.env.REACT_APP_ROOT_URL

export const BPM_PORT = process.env.REACT_APP_BPM_PORT
const AUTH_PORT = process.env.REACT_APP_AUTH_PORT
const NOTIFICATION_PORT = process.env.REACT_APP_NOTIFICATION_PORT
const CRM_PORT = process.env.REACT_APP_CRM_PORT

// BPM Services
export const issueServiceUrl = `${ROOT_URL}:${BPM_PORT}/issues`
export const issueEventServiceUrl = `${ROOT_URL}:${BPM_PORT}/issueEvents`
export const labelServiceUrl = `${ROOT_URL}:${BPM_PORT}/labels`
export const categoryServiceUrl = `${ROOT_URL}:${BPM_PORT}/categories`
export const unitServiceUrl = `${ROOT_URL}:${BPM_PORT}/units`
export const fileServiceUrl = `${ROOT_URL}:${BPM_PORT}/files`
export const activityServiceUrl = `${ROOT_URL}:${BPM_PORT}/activities`

// AUTH Services
export const userServiceUrl = `${ROOT_URL}:${AUTH_PORT}/users`
export const authenticationServiceUrl = `${ROOT_URL}:${AUTH_PORT}/auth`
export const roleServiceUrl = `${ROOT_URL}:${AUTH_PORT}/roles`

// CRM Services
export const companyServiceUrl = `${ROOT_URL}:${CRM_PORT}/companies`
export const productServiceUrl = `${ROOT_URL}:${CRM_PORT}/products`
export const saleServiceUrl = `${ROOT_URL}:${CRM_PORT}/sales`
export const offerServiceUrl = `${ROOT_URL}:${CRM_PORT}/offers`
export const contactServiceUrl = `${ROOT_URL}:${CRM_PORT}/contacts`

// Notification Services
export const notificationServiceUrl = `${ROOT_URL}:${NOTIFICATION_PORT}/notifications`

// Feedback Services
export const feedbackServiceUrl = `${ROOT_URL}:${BPM_PORT}/feedback`
