// 测试 Supabase 统计功能
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  console.log('Please set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testAnalytics() {
  console.log('Testing Supabase Analytics...')
  console.log('Supabase URL:', supabaseUrl)

  try {
    // 1. 测试插入页面访问记录
    console.log('\n1. Testing page view insertion...')
    const { data: insertData, error: insertError } = await supabase
      .from('analytics')
      .insert({
        page: '/test',
        session_id: 'test-session-' + Date.now(),
        user_id: 'test-user',
        url: 'http://localhost:3000/test',
        user_agent: 'Test Browser',
        timestamp: new Date().toISOString()
      })

    if (insertError) {
      console.error('Insert error:', insertError)
    } else {
      console.log('✅ Page view inserted successfully')
    }

    // 2. 测试查询页面访问记录
    console.log('\n2. Testing page view query...')
    const { data: queryData, error: queryError } = await supabase
      .from('analytics')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(5)

    if (queryError) {
      console.error('Query error:', queryError)
    } else {
      console.log('✅ Page views queried successfully:', queryData?.length || 0, 'records')
      if (queryData && queryData.length > 0) {
        console.log('Sample record:', queryData[0])
      }
    }

    // 3. 测试用户会话
    console.log('\n3. Testing user session...')
    const sessionId = 'test-session-' + Date.now()
    const { error: sessionError } = await supabase
      .from('user_sessions')
      .upsert({
        session_id: sessionId,
        user_id: 'test-user',
        user_agent: 'Test Browser',
        last_activity: new Date().toISOString()
      }, {
        onConflict: 'session_id'
      })

    if (sessionError) {
      console.error('Session error:', sessionError)
    } else {
      console.log('✅ User session created/updated successfully')
    }

    // 4. 测试页面访问统计
    console.log('\n4. Testing page statistics...')
    const { data: pageStats, error: pageError } = await supabase
      .from('analytics')
      .select('page')
      .gte('timestamp', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

    if (pageError) {
      console.error('Page stats error:', pageError)
    } else {
      const pageViews = pageStats?.reduce((acc, curr) => {
        if (curr.page) {
          acc[curr.page] = (acc[curr.page] || 0) + 1
        }
        return acc
      }, {}) || {}
      
      console.log('✅ Page statistics calculated:', pageViews)
    }

    console.log('\n✅ All tests completed!')

  } catch (error) {
    console.error('Test failed:', error)
  }
}

testAnalytics()
