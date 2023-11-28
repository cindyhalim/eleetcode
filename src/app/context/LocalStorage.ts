type Minute = number

type TimerSettings = {
  enabled: boolean
  easy: Minute
  medium: Minute
  hard: Minute
}

const TIMER_SETTINGS_KEY = '__timer_settings__'

const DEFAULT_TIMER_SETTINGS = {
  enabled: true,
  easy: 20,
  medium: 40,
  hard: 60,
}

function getTimerSettings() {
  const settings = window.localStorage.getItem(TIMER_SETTINGS_KEY)

  if (!settings) {
    return null
  }

  return JSON.parse(settings)
}

function setTimerSettings(payload: TimerSettings = DEFAULT_TIMER_SETTINGS) {
  window.localStorage.setItem(TIMER_SETTINGS_KEY, JSON.stringify(payload))
}

const LocalStorage = {
  getTimerSettings,
  setTimerSettings,
}

export default LocalStorage
