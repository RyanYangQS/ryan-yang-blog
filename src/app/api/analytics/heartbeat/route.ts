import { NextRequest, NextResponse } from 'next/server';

// 存储在线用户信息的内存缓存
const onlineUsers = new Map();
const HEARTBEAT_TIMEOUT = 60000; // 60秒超时

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, userId, lastActivity, timestamp } = body;
    
    // 更新在线用户信息
    onlineUsers.set(sessionId, {
      userId,
      lastActivity,
      timestamp
    });
    
    // 清理超时的在线用户
    const now = Date.now();
    for (const [sid, userData] of onlineUsers.entries()) {
      if (now - userData.lastActivity > HEARTBEAT_TIMEOUT) {
        onlineUsers.delete(sid);
      }
    }
    
    return NextResponse.json({ 
      success: true,
      onlineUsers: onlineUsers.size
    });
  } catch (error) {
    console.error('Error processing heartbeat:', error);
    return NextResponse.json(
      { error: 'Failed to process heartbeat' },
      { status: 500 }
    );
  }
}
