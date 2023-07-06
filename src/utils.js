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

export function CreatePost(sender, parent_id, form) {
  const today = getTodayDate()

  const post = {
    sender: [sender],
    active: 'True',
    flag_transaction: 'False',
    react_by: {},
    created_by: sender.id,
    updated_by: sender.id,
    created: today,
    updated: today,

    point: form.point,
    recipients: form.recipients,
    hashtags: form.hashtags,
    image: form.image,
    gif: form.gif,
    link: form.link,
    message: form.message,
  }

  if (parent_id) post.parent_id = parent_id

  return post
}