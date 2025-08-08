import { NextRequest, NextResponse } from 'next/server'
import supabaseAnalyticsService from '@/lib/supabaseAnalyticsService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { page, url, userAgent, referrer, sessionId, userId, screenSize, viewportSize, language, timezone } = body
    
    const success = await supabaseAnalyticsService.trackPageView(page, {
      url,
      userAgent,
      referrer,
      sessionId,
      userId,
      screenSize,
      viewportSize,
      language,
      timezone
    })
    
    if (success) {
      return NextResponse.json({ success: true }, { status: 201 })
    } else {
      return NextResponse.json(
        { error: 'Failed to create analytics' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error creating analytics:', error)
    return NextResponse.json(
      { error: 'Failed to create analytics' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const days = parseInt(searchParams.get('days') || '7')
    
    const stats = await supabaseAnalyticsService.getPageStats(page, days)
    
    if (stats) {
      return NextResponse.json(stats)
    } else {
      return NextResponse.json(
        { error: 'Failed to fetch analytics' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
