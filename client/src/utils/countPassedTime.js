export const countPassedTime = (date) => {
  let time = Date.now() - date
  let unit = 'ms'

  if (time > 1000) {
    unit = 'sec'
    time /= 1000
  }

  if (time > 60) {
    unit = 'min'
    time /= 60
  }

  if (time > 60) {
    unit = 'hours'
    time /= 60
  }

  if (time > 24) {
    unit = 'days'
    time /= 24
  }

  return `${time.toFixed(0)}${unit} ago`
}
