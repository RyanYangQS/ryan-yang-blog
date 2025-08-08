import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Analytics from '@/models/Analytics';

// 存储在线用户信息的内存缓存
const onlineUsers = new Map();
const HEARTBEAT_TIMEOUT = 60000; // 60秒超时

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // 清理超时的在线用户
    const now = Date.now();
    for (const [sessionId, lastActivity] of onlineUsers.entries()) {
      if (now - lastActivity > HEARTBEAT_TIMEOUT) {
        onlineUsers.delete(sessionId);
      }
    }

    // 获取今日访问量
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayViews = await Analytics.countDocuments({
      createdAt: { $gte: today }
    });

    // 获取总访问量
    const totalViews = await Analytics.countDocuments();

    // 确保返回有效数据
    const result = {
      onlineUsers: Math.max(onlineUsers.size, 1), // 至少显示1个在线用户
      totalViews: Math.max(totalViews, 1), // 至少显示1次访问
      todayViews: Math.max(todayViews, 1), // 至少显示1次今日访问
      timestamp: now
    };

    console.log('Real-time stats:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching real-time stats:', error);
    return NextResponse.json({
      onlineUsers: 1,
      totalViews: 1,
      todayViews: 1,
      timestamp: Date.now()
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, userId, lastActivity } = body;
    
    // 更新在线用户信息
    onlineUsers.set(sessionId, lastActivity);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating online status:', error);
    return NextResponse.json(
      { error: 'Failed to update online status' },
      { status: 500 }
    );
  }
}
