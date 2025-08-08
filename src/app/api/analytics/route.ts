import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Analytics from '@/models/Analytics'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { page, url, userAgent, referrer, sessionId } = body
    
    const analytics = await Analytics.create({
      page,
      url,
      userAgent,
      referrer,
      sessionId,
    })
    
    return NextResponse.json(analytics, { status: 201 })
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
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const days = parseInt(searchParams.get('days') || '7')
    
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    const query: any = {
      createdAt: { $gte: startDate }
    }
    
    if (page) {
      query.page = page
    }
    
    const analytics = await Analytics.find(query)
    
    const stats = {
      totalViews: analytics.length,
      uniqueSessions: new Set(analytics.map(a => a.sessionId)).size,
      topPages: analytics.reduce((acc, curr) => {
        acc[curr.page] = (acc[curr.page] || 0) + 1
        return acc
      }, {}),
    }
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
