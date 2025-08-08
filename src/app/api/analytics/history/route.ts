import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Analytics from '@/models/Analytics';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // 获取指定时间范围内的访问数据
    const analytics = await Analytics.find({
      createdAt: { $gte: startDate }
    }).sort({ createdAt: 1 });
    
    // 计算统计数据
    const totalViews = analytics.length;
    const uniqueSessions = new Set(analytics.map(a => a.sessionId)).size;
    const uniqueUsers = new Set(analytics.filter(a => a.userId).map(a => a.userId)).size;
    
    // 计算页面访问统计
    const pageStats = analytics.reduce((acc, curr) => {
      acc[curr.page] = (acc[curr.page] || 0) + 1;
      return acc;
    }, {});
    
    // 计算每日统计
    const dailyStats = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const dayViews = analytics.filter(a => 
        a.createdAt >= date && a.createdAt < nextDate
      ).length;
      
      dailyStats.unshift({
        date: date.toISOString().split('T')[0],
        views: dayViews
      });
    }
    
    // 获取热门页面
    const topPages = Object.entries(pageStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .reduce((acc, [page, count]) => {
        acc[page] = count;
        return acc;
      }, {});
    
    return NextResponse.json({
      totalViews,
      uniqueSessions,
      uniqueUsers,
      topPages,
      dailyStats,
      period: `${days}天`
    });
  } catch (error) {
    console.error('Error fetching historical stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch historical stats' },
      { status: 500 }
    );
  }
}
