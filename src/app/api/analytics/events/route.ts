import { NextRequest, NextResponse } from 'next/server'
import supabaseAnalyticsService from '@/lib/supabaseAnalyticsService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, sessionId, userId, page, data } = body
    
    const success = await supabaseAnalyticsService.trackUserEvent(action, {
      sessionId,
      userId,
      page,
      eventData: data
    })
    
    if (success) {
      return NextResponse.json({ success: true }, { status: 201 })
    } else {
      return NextResponse.json(
        { error: 'Failed to track user event' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error tracking user event:', error)
    return NextResponse.json(
      { error: 'Failed to track user event' },
      { status: 500 }
    )
  }
}
