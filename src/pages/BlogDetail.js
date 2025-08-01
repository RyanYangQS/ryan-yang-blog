import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Check, Clock, Copy, Heart, MessageCircle, Share2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // 模拟博客数据
  const blogPosts = [
    {
      id: 1,
      title: "React 18 新特性深度解析",
      excerpt: "深入探讨React 18的并发特性、自动批处理、Suspense等新功能，以及如何在实际项目中应用这些特性提升用户体验。",
      category: "React",
      readTime: "8分钟",
      publishDate: "2024-01-15",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["React", "JavaScript", "前端"],
      content: `
# React 18 新特性深度解析

React 18带来了许多激动人心的新特性，这些特性将彻底改变我们构建React应用的方式。本文将深入探讨这些新功能，并展示如何在实际项目中应用它们。

## 并发特性 (Concurrent Features)

React 18最重要的新特性是并发渲染。这允许React同时准备多个版本的UI，而不会阻塞用户界面。

### 自动批处理 (Automatic Batching)

在React 18之前，React只在事件处理函数中进行批处理。现在，React会在所有地方自动进行批处理，包括Promise、setTimeout、原生事件处理函数等。

\`\`\`javascript
// React 18 之前的代码
function handleClick() {
  setCount(c => c + 1); // 不会触发重新渲染
  setFlag(f => !f);     // 不会触发重新渲染
  // 只有在这里才会触发重新渲染
}

// React 18 中的代码
function handleClick() {
  setCount(c => c + 1); // 不会触发重新渲染
  setFlag(f => !f);     // 不会触发重新渲染
  // 仍然只有在这里才会触发重新渲染
}
\`\`\`

### Suspense 的改进

React 18对Suspense进行了重大改进，现在它可以在服务端渲染中工作。

\`\`\`jsx
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <SomeComponent />
    </Suspense>
  );
}
\`\`\`

## 新的Hooks

### useTransition

\`useTransition\`允许你标记某些状态更新为非紧急的，这样它们就不会阻塞用户界面。

\`\`\`javascript
import { useTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    });
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
\`\`\`

### useDeferredValue

\`useDeferredValue\`允许你延迟更新某些不那么重要的部分。

\`\`\`javascript
import { useDeferredValue } from 'react';

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  
  return (
    <ul>
      {search(deferredQuery).map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

## 实际应用示例

让我们看一个实际的例子，展示如何在项目中使用这些新特性：

\`\`\`jsx
import React, { useState, useTransition, useDeferredValue } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('');
  const [isPending, startTransition] = useTransition();
  const deferredFilter = useDeferredValue(filter);

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(deferredFilter.toLowerCase())
  );

  function addTodo(text) {
    startTransition(() => {
      setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
    });
  }

  return (
    <div>
      <input
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="过滤待办事项..."
      />
      {isPending && <div>添加中...</div>}
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

## 总结

React 18的新特性为构建更好的用户体验提供了强大的工具。通过合理使用并发特性，我们可以创建更流畅、更响应的应用程序。

记住，这些新特性是可选的，你可以逐步将它们集成到现有的项目中。
      `
    }
  ];

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.id === parseInt(id));
    setPost(foundPost);
  }, [id]);

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
        date: new Date().toLocaleDateString(),
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
      };
      setComments([newComment, ...comments]);
      setComment('');
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-lg">文章未找到</div>
          <Link to="/blog" className="text-primary-400 hover:text-primary-300 mt-4 inline-block">
            返回博客列表
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
            className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回博客列表</span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          {/* Category and Date */}
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6">
            <span className="px-3 py-1 bg-primary-600 text-white rounded-full">
              {post.category}
            </span>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{post.publishDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-dark-700 text-gray-300 text-sm rounded-full hover:bg-primary-600 hover:text-white transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                liked
                  ? 'bg-red-600 text-white'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              <span>{liked ? '已点赞' : '点赞'}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600 transition-all duration-300"
            >
              <Share2 className="w-5 h-5" />
              <span>分享</span>
            </motion.button>
          </div>
        </motion.article>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="prose prose-invert prose-lg max-w-none mb-12"
        >
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
                        className="absolute top-2 right-2 p-2 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors duration-300"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
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
                  <code className="bg-dark-700 px-2 py-1 rounded text-sm" {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-dark-600 pt-12"
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center space-x-2">
            <MessageCircle className="w-6 h-6" />
            <span>评论 ({comments.length})</span>
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleComment} className="mb-8">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="写下你的评论..."
              className="w-full p-4 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows="4"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="mt-4 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300"
            >
              发表评论
            </motion.button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex space-x-4"
              >
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-white">{comment.author}</span>
                    <span className="text-gray-400 text-sm">{comment.date}</span>
                  </div>
                  <p className="text-gray-300">{comment.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail; 