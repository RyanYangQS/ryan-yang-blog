import { NextRequest, NextResponse } from 'next/server'
import supabaseAnalyticsService from '@/lib/supabaseAnalyticsService'

export async function GET(request: NextRequest) {
  try {
    const stats = await supabaseAnalyticsService.getRealTimeStats()
    
    if (stats) {
      return NextResponse.json({
        onlineUsers: stats.online_users || 1,
        totalViews: Math.max(stats.today_views || 1, 1),
        todayViews: Math.max(stats.today_views || 1, 1),
        timestamp: Date.now()
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to fetch real-time stats' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error fetching real-time stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch real-time stats' },
      { status: 500 }
    )
  }
}
