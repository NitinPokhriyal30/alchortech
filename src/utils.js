export async function wait(milliseconds) {
  return new Promise((res) => setTimeout(res, milliseconds))
}

export function AxiosError(...args) {
  const error = Error(...args)
  error.isAxiosError = true
  return error
}

export function dateDiff(second, first) {
  return Math.round((second - first) / (1000 * 60 * 60 * 24))
}

export function getTodayDate() {
  const todayDate = new Date()
  const today =
    todayDate.getFullYear() +
    '-' +
    (todayDate.getMonth()+1).toString().padStart(2, '0') +
    '-' +
    todayDate.getDate().toString().padStart(2, '0')
  return today
}
