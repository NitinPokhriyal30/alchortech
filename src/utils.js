function getNextMonthDate() {
  
  // Get the current date
  var currentDate = new Date();

  // Get the month index (0-11)
  var currentMonthIndex = currentDate.getMonth();

  // Increment the month index to get the next month
  var nextMonthIndex = currentMonthIndex + 1;

  // Adjust for December (month index 11)
  if (nextMonthIndex === 12) {
    nextMonthIndex = 0;
  }

  // Create a new Date object with the next month
  var nextMonthDate = new Date();
  nextMonthDate.setMonth(nextMonthIndex);

  return nextMonthDate;
}

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
    (todayDate.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    todayDate.getDate().toString().padStart(2, '0')
  return today
}

export function getNextMonthName() {

  const nextMonthDate = getNextMonthDate();

  // Get the name of the next month
  var nextMonthName = nextMonthDate.toLocaleString('en-US', { month: 'long' });

  return nextMonthName;

}

export function getDaysLeftForNextMonth() {

  const nextMonthDate = getNextMonthDate();

  // Get the current date
  var currentDate = new Date();

  // Set the date to the 1st day of the next month
  nextMonthDate.setDate(1);

  // Calculate the difference in milliseconds between the current date and the next month's date
  var timeDiff = nextMonthDate.getTime() - currentDate.getTime();

  // Calculate the number of days left until the next month
  var daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return daysLeft;

}

export function CreatePost(senderId, parent_id, form) {
  const today = getTodayDate()

  const post = {
    sender: senderId,
    active: 'True',
    flag_transaction: 'False',
    react_by: form.react_by || [],
    created_by: senderId,
    updated_by: senderId,
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

export function CreatePostComment(senderId, form) {
  const today = getTodayDate()

  const comment = {
    created_by: senderId,
    updated_by: senderId,
    active: 'true',
    flagged_comment: 'false',
    react_by: {},
    created: today,
    updated: today,

    post_id: form.post_id,
    image: form.image,
    gif: form.gif,
    comment: form.comment,
  }

  return comment
}
