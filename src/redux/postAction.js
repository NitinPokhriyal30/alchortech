import { store } from './store'

export function addPoints(postId, points) {
  const { user } = store.getState()

  store.dispatch({
    type: 'add-points',
    postId,
    points,
    me: user,
  })
}

export function addReaction(postId, emoji) {
  const { user } = store.getState()

  store.dispatch({
    type: 'add-reaction',
    postId,
    emoji,
    me: user,
  })
}

export function addComment(commentId, commentData) {
  const { user } = store.getState()
  store.dispatch({
    type: 'add-comment',
    commentId,
    commentData,
    me: user,
  })
}

export function addCommentReaction(commentId, emoji) {
  const {user} = store.getState()

  store.dispatch({
    type: 'add-comment-reaction',
    commentId,
    emoji,
    me: user
  })
}
