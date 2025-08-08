import { NextRequest, NextResponse } from 'next/server'
import supabaseAnalyticsService from '@/lib/supabaseAnalyticsService'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '7')
    
    const stats = await supabaseAnalyticsService.getHistoricalStats(days)
    
    if (stats) {
      return NextResponse.json({
        totalViews: Math.max(stats.totalViews, 1),
        uniqueUsers: Math.max(stats.uniqueUsers, 1),
        uniqueSessions: Math.max(stats.uniqueSessions, 1),
        topPages: stats.topPages || {},
        dailyStats: stats.dailyStats || [],
        period: stats.period || `${days}天`
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to fetch historical stats' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error fetching historical stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch historical stats' },
      { status: 500 }
    )
  }
}
