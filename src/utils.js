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
