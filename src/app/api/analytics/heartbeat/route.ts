import { NextRequest, NextResponse } from 'next/server'
import supabaseAnalyticsService from '@/lib/supabaseAnalyticsService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, userId, lastActivity } = body
    
    const success = await supabaseAnalyticsService.sendHeartbeat(sessionId, userId, lastActivity)
    
    if (success) {
      return NextResponse.json({ success: true }, { status: 200 })
    } else {
      return NextResponse.json(
        { error: 'Failed to send heartbeat' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error sending heartbeat:', error)
    return NextResponse.json(
      { error: 'Failed to send heartbeat' },
      { status: 500 }
    )
  }
}
