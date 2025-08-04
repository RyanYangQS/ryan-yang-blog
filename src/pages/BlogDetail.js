import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Check, Clock, Copy, Heart, MessageCircle, Share2, Tag } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getPostBySlug, formatDate } from '../utils/blogUtils';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // 获取博客文章
  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await getPostBySlug(slug);
        if (postData) {
          setPost(postData);
        } else {
          // 处理文章不存在的情况
          console.error('Post not found:', slug);
        }
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  const handleCopyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        author: '访客',
        content: comment,
        date: new Date().toISOString(),
      };
      setComments([newComment, ...comments]);
      setComment('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-400">加载文章...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">文章未找到</h1>
          <p className="text-gray-400 mb-6">抱歉，您访问的文章不存在。</p>
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回博客列表</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回博客列表</span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-effect rounded-2xl p-8 mb-8"
        >
          {/* Cover Image */}
          {post.frontmatter.coverImage && (
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
              <img
                src={post.frontmatter.coverImage}
                alt={post.frontmatter.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {post.frontmatter.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.frontmatter.date)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{Math.ceil(post.content.split(' ').length / 200)}分钟阅读</span>
            </div>
            {post.frontmatter.author && (
              <div className="flex items-center space-x-2">
                <span>作者: {post.frontmatter.author}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {post.frontmatter.tags && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.frontmatter.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-500/20 text-primary-400"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Excerpt */}
          {post.frontmatter.excerpt && (
            <div className="mb-8 p-4 bg-dark-700 rounded-lg border-l-4 border-primary-500">
              <p className="text-gray-300 italic">{post.frontmatter.excerpt}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                liked
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600 border border-gray-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              <span>{liked ? '已喜欢' : '喜欢'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.frontmatter.title,
                    text: post.frontmatter.excerpt,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-dark-700 text-gray-300 hover:bg-dark-600 border border-gray-600 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>已复制</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>分享</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const code = String(children).replace(/\n$/, '');

                  if (!inline && match) {
                    return (
                      <div className="relative">
                        <button
                          onClick={() => handleCopyCode(code)}
                          className="absolute top-2 right-2 p-2 bg-dark-800 text-gray-400 hover:text-white rounded transition-colors"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <SyntaxHighlighter
                          style={tomorrow}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-lg"
                          {...props}
                        >
                          {code}
                        </SyntaxHighlighter>
                      </div>
                    );
                  }

                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-white mb-6 mt-8">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-white mb-4 mt-6">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold text-white mb-3 mt-5">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-300">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-300 mb-4">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-primary-400 hover:text-primary-300 underline transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </motion.article>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-effect rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <MessageCircle className="w-6 h-6" />
            <span>评论 ({comments.length})</span>
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleComment} className="mb-8">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="写下你的评论..."
              className="w-full p-4 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors resize-none"
              rows="4"
            />
            <div className="flex justify-end mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                发表评论
              </motion.button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-700 pb-6 last:border-b-0">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {comment.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{comment.author}</p>
                    <p className="text-gray-400 text-sm">{formatDate(comment.date)}</p>
                  </div>
                </div>
                <p className="text-gray-300">{comment.content}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail; 