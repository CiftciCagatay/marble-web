import { CALENDAR_CONFIGURED, CALENDAR_DESTROYED } from "./types";

export function configureCalendar(calendar) {
  return { type: CALENDAR_CONFIGURED, payload: calendar }
}

export function destroyCalendar() {
  return { type: CALENDAR_DESTROYED }
}
