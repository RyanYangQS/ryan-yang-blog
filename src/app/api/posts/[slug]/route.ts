import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Post from '@/models/Post'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: PostPageProps
) {
  try {
    await dbConnect()
    
    const post = await Post.findOne({ 
      slug: params.slug,
      status: 'published'
    }).populate('author', 'name avatar')
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    // 增加访问量
    await Post.findByIdAndUpdate(post._id, {
      $inc: { viewCount: 1 }
    })
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}
