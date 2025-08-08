import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

// 创建事件模型
const EventSchema = {
  action: String,
  page: String,
  sessionId: String,
  userId: String,
  timestamp: Number,
  data: Object
};

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { action, page, sessionId, userId, timestamp, data } = body;
    
    // 这里可以存储到数据库，暂时只记录到控制台
    console.log('User Event:', {
      action,
      page,
      sessionId,
      userId,
      timestamp,
      data
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}
