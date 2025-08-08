import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, LogIn } from 'lucide-react';
import { commentService, likeService } from '../lib/supabaseService.js';
import { authService } from '../lib/authService.js';
import AuthModal from './AuthModal.js';

const CommentSectionWithAuth = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      const fetchedComments = await commentService.getCommentsByPostId(postId);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  const fetchLikes = useCallback(async () => {
    try {
      const likesCount = await likeService.getPostLikes(postId);
      setLikes(likesCount);
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  }, [postId]);

  const checkUser = useCallback(async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      
      if (currentUser) {
        const liked = await likeService.isPostLikedByUser(postId, currentUser.id);
        setIsLiked(liked);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
    fetchLikes();
    checkUser();
  }, [fetchComments, fetchLikes, checkUser]);

  const handleLike = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      if (isLiked) {
        await likeService.unlikePost(postId, user.id);
        setLikes(prev => prev - 1);
        setIsLiked(false);
      } else {
        await likeService.likePost(postId, user.id);
        setLikes(prev => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      await commentService.createComment({
        post_id: postId,
        user_id: user.id,
        author: user.user_metadata?.username || user.email,
        content: newComment.trim()
      });
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAuthSuccess = () => {
    checkUser();
    setShowAuthModal(false);
  };

  return (
    <div className="mt-12 bg-dark-800 rounded-2xl p-8 border border-dark-600">
      {/* 点赞和评论统计 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likes}</span>
          </button>
          <div className="flex items-center space-x-2 text-gray-400">
            <MessageCircle className="w-5 h-5" />
            <span>{comments.length} 条评论</span>
          </div>
        </div>
      </div>

      {/* 评论表单 */}
      <div className="mb-8">
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user.user_metadata?.username?.charAt(0)?.toUpperCase() || user.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="写下您的评论..."
                  className="w-full p-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent h-24 resize-none"
                  required
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-400">
                    以 {user.user_metadata?.username || user.email} 身份评论
                  </span>
                  <button
                    type="submit"
                    disabled={submitting || !newComment.trim()}
                    className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>发布中...</span>
                      </>
                    ) : (
                      <span>发表评论</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center py-8 border border-dashed border-dark-600 rounded-lg">
            <div className="text-gray-400 mb-4">
              <LogIn className="w-12 h-12 mx-auto mb-4" />
              <p className="text-lg mb-2">需要登录才能评论</p>
              <p className="text-sm">请先登录您的账户</p>
            </div>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              立即登录
            </button>
          </div>
        )}
      </div>

      {/* 评论列表 */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((index) => (
            <div key={index} className="animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-dark-600 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-dark-600 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-dark-600 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-dark-600 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg mb-2">还没有评论</div>
          <div className="text-gray-500 text-sm">成为第一个发表评论的人吧！</div>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-dark-600 pb-6 last:border-b-0"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {comment.user_profiles?.username?.charAt(0)?.toUpperCase() || comment.author?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">
                      {comment.user_profiles?.username || comment.author}
                    </h4>
                    <span className="text-sm text-gray-400">
                      {formatDate(comment.created_at)}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 认证模态框 */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default CommentSectionWithAuth;
