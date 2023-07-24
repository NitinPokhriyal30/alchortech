import { useQuery } from 'react-query'
import { api } from '@/api'
import PostComment from '@/components/PostComment'

const getPostComment = (postId, comments) =>
  comments.filter((comment) => comment.post_id === postId)
export default function PostCommentList({ postId }) {
  const comments = useQuery('comments', () => api.comment.all())

  return (
    comments.data &&
    getPostComment(postId, comments.data).length > 0 &&
    getPostComment(postId, comments.data)
      .sort((a, b) => Date(a) - Date(b))
      .map((comment) => <PostComment comment={comment} />)
  )
}
