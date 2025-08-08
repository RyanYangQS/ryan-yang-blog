'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { MessageCircle, Send } from 'lucide-react'

interface Comment {
  _id: string
  author: {
    name: string
    email: string
    avatar?: string
  }
  content: string
  createdAt: string
  likeCount: number
}

interface CommentSectionProps {
  postSlug: string
}

export default function CommentSection({ postSlug }: CommentSectionProps) {
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim() || !session) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/posts/${postSlug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          author: {
            name: session.user?.name,
            email: session.user?.email,
            avatar: session.user?.image,
          },
        }),
      })

      if (response.ok) {
        const newComment = await response.json()
        setComments([newComment, ...comments])
        setComment('')
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="w-6 h-6 text-primary-400" />
        <h3 className="text-2xl font-bold text-white">评论</h3>
      </div>

      {session ? (
        <motion.form
          onSubmit={handleSubmit}
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex space-x-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="写下你的评论..."
              className="flex-1 p-4 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none resize-none"
              rows={3}
            />
            <button
              type="submit"
              disabled={isSubmitting || !comment.trim()}
              className="px-6 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 rounded-lg text-white font-medium transition-colors duration-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </motion.form>
      ) : (
        <div className="mb-8 p-6 bg-dark-800 rounded-lg text-center">
          <p className="text-gray-300 mb-4">请登录后发表评论</p>
          <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white font-medium transition-colors duration-200">
            登录
          </button>
        </div>
      )}

      <div className="space-y-6">
        {comments.map((comment, index) => (
          <motion.div
            key={comment._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-dark-800 rounded-lg border border-dark-600"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {comment.author.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-white">
                    {comment.author.name}
                  </span>
                  <span className="text-sm text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-300">{comment.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
