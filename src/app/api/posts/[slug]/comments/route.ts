import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Comment from '@/models/Comment'
import Post from '@/models/Post'

interface CommentPageProps {
  params: {
    slug: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: CommentPageProps
) {
  try {
    await dbConnect()
    
    const post = await Post.findOne({ slug: params.slug })
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    const comments = await Comment.find({
      postId: post._id,
      isApproved: true,
    }).sort({ createdAt: -1 })
    
    return NextResponse.json(comments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: CommentPageProps
) {
  try {
    await dbConnect()
    
    const post = await Post.findOne({ slug: params.slug })
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    const body = await request.json()
    const { author, content, parentId } = body
    
    const comment = await Comment.create({
      postId: post._id,
      author,
      content,
      parentId,
    })
    
    // 更新文章评论数
    await Post.findByIdAndUpdate(post._id, {
      $inc: { commentCount: 1 }
    })
    
    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
