import PostUser from '../assets/images/post-img/post-user.png'
import MyProfileImg from '../assets/images/user-profile/male_avatar.jpg'

function Comment(commentData, user, reactions = [], ...replies) {
  return {
    id: Math.random().toString(),
    user: Object.assign(user, { img: PostUser, id: Math.random().toString() }),
    reactions: reactions.map((emoji) => ({
      user: { id: Math.random().toString() },
      emoji,
    })),
    message: '',
    image: '',
    gif: '',
    ...commentData,
    timestamp: new Date(),
    replies: replies || [],
  }
}

const postInitialState = [
  {
    id: Math.random().toString(),
    sender: [
      {
        id: Math.random(),
        img: MyProfileImg,
        firstName: 'John',
        lastName: 'Doe',
        points: 30,
      },
    ],

    hashtags: ['vision', 'culture'],
    recipients: [
      {
        id: 1,
        img: PostUser,
        firstName: 'Semad',
        lastName: 'Gulia',
      },
      {
        id: 2,
        img: PostUser,
        firstName: 'Lisa',
        lastName: 'Clinton',
      },
    ],
    message: 'For helping me launch a marketing campaign so that we can generate new business',
    image: null,
    link: '',
    timestamp: '2023-05-20T17:39:17.112Z',
    reactions: [
      // {
      //   user: { id: 1 },
      //   emoji: '🥰',
      // },
    ],

    comment: Comment(
      '',
      {
        id: Math.random(),
        img: MyProfileImg,
        firstName: 'John',
        lastName: 'Doe',
        points: 30,
      },
      [
        /* reactions array */
      ]
      /* replies (nested comment) */
    ),
  },

  {
    id: Math.random().toString(),
    sender: [
      {
        id: Math.random(),
        img: MyProfileImg,
        firstName: 'Alex',
        lastName: 'Brandon',
        points: 30,
      },
    ],

    hashtags: ['festival', 'culture'],
    recipients: [
      {
        id: 1,
        img: PostUser,
        firstName: 'Semad',
        lastName: 'Gulia',
      },
      {
        id: 2,
        img: PostUser,
        firstName: 'Melroy',
        lastName: 'Pinto',
      },
    ],
    message:
      "Just went on an amazing hike and the views were absolutely breathtaking! Nature truly has a way of filling your soul with peace and calming your mind. It's so important to take a break from our busy lives and appreciate the beauty that surrounds us.",
    image: null,
    link: '',
    timestamp: '2023-05-21T17:39:17.112Z',
    reactions: [
      // {
      //   user: { id: 1 },
      //   emoji: '🥰',
      // },
    ],

    comment: Comment(
      '',
      {
        id: Math.random(),
        img: MyProfileImg,
        firstName: 'John',
        lastName: 'Doe',
        points: 30,
      },
      [
        /* reactions array */
      ]
      /* replies (nested comment) */
    ),
  },
]

function postReducer(posts = postInitialState, action) {
  switch (action.type) {
    case 'add-points': {
      const { postId, points, me } = action
      const targetPost = posts.find((x) => x.id === postId)
      const myPoints = targetPost.sender.find((x) => x.id === me.id)

      if (myPoints != null) {
        myPoints.points = points
      } else
        targetPost.sender.push({
          points,
          ...me,
        })

      return [...posts]
    }

    case 'add-reaction': {
      const { postId, me, emoji } = action

      const targetPost = posts.find((x) => x.id === postId)
      const myReaction = targetPost.reactions.find((x) => x.user.id === me.id)

      if (myReaction) {
        myReaction.emoji = emoji
      } else {
        targetPost.reactions.push({
          user: me,
          emoji,
        })
      }

      return [...posts]
    }

    case 'add-comment': {
      const { commentId, commentData, me } = action

      let targetComment
      function findTargetComment(comment) {
        if (targetComment != null) return
        if (comment.id === commentId) {
          targetComment = comment
          return
        }

        comment.replies.forEach((x) => findTargetComment(x))
      }

      posts.forEach((post) => findTargetComment(post.comment))

      targetComment.replies.push(Comment(commentData, me))

      return [...posts]
    }

    case 'add-comment-reaction': {
      const { commentId, emoji, me } = action

      let targetComment
      function findTargetComment(comment) {
        if (targetComment != null) return
        if (comment.id === commentId) {
          targetComment = comment
          return
        }

        comment.replies.forEach((x) => findTargetComment(x))
      }

      posts.forEach((post) => findTargetComment(post.comment))

      const myReaction = targetComment.reactions.find((x) => x.user.id === me.id)
      if (myReaction) {
        myReaction.emoji = emoji
      } else
        targetComment.reactions.push({
          user: me,
          emoji,
        })

      return [...posts]
    }

    case 'redux': {
      action.fn(posts)
      return [...posts]
    }
    default:
      return posts
  }
}

export default postReducer
export { postInitialState }
