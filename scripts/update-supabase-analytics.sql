-- 更新Supabase数据库以支持统计功能
-- 执行此脚本以添加统计相关的表和字段

-- 扩展analytics表结构以支持更详细的统计功能
ALTER TABLE analytics ADD COLUMN IF NOT EXISTS session_id VARCHAR(255);
ALTER TABLE analytics ADD COLUMN IF NOT EXISTS user_id VARCHAR(255);
ALTER TABLE analytics ADD COLUMN IF NOT EXISTS url TEXT;
ALTER TABLE analytics ADD COLUMN IF NOT EXISTS referrer TEXT;
ALTER TABLE analytics ADD COLUMN IF NOT EXISTS screen_size VARCHAR(50);
ALTER TABLE analytics ADD COLUMN IF NOT EXISTS viewport_size VARCHAR(50);
ALTER TABLE analytics ADD COLUMN IF NOT EXISTS language VARCHAR(10);
ALTER TABLE analytics ADD COLUMN IF NOT EXISTS timezone VARCHAR(50);

-- 创建用户会话表
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  user_id VARCHAR(255),
  user_agent TEXT,
  ip_address INET,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建用户事件表
CREATE TABLE IF NOT EXISTS user_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255),
  action VARCHAR(100) NOT NULL,
  page VARCHAR(255),
  data JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建心跳记录表
CREATE TABLE IF NOT EXISTS heartbeat_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON analytics(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp_desc ON analytics(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_user_sessions_session_id ON user_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_last_activity ON user_sessions(last_activity);
CREATE INDEX IF NOT EXISTS idx_user_events_session_id ON user_events(session_id);
CREATE INDEX IF NOT EXISTS idx_user_events_timestamp ON user_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_heartbeat_logs_session_id ON heartbeat_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_heartbeat_logs_timestamp ON heartbeat_logs(timestamp);

-- 启用行级安全策略
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE heartbeat_logs ENABLE ROW LEVEL SECURITY;

-- 为user_sessions表创建策略
CREATE POLICY "User sessions are insertable by everyone" ON user_sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "User sessions are viewable by authenticated users" ON user_sessions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "User sessions are updatable by everyone" ON user_sessions
  FOR UPDATE USING (true);

-- 为user_events表创建策略
CREATE POLICY "User events are insertable by everyone" ON user_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "User events are viewable by authenticated users" ON user_events
  FOR SELECT USING (auth.role() = 'authenticated');

-- 为heartbeat_logs表创建策略
CREATE POLICY "Heartbeat logs are insertable by everyone" ON heartbeat_logs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Heartbeat logs are viewable by authenticated users" ON heartbeat_logs
  FOR SELECT USING (auth.role() = 'authenticated');

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_sessions_updated_at
  BEFORE UPDATE ON user_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 创建清理过期数据的函数
CREATE OR REPLACE FUNCTION cleanup_old_analytics_data()
RETURNS void AS $$
BEGIN
  -- 删除30天前的analytics数据
  DELETE FROM analytics WHERE timestamp < NOW() - INTERVAL '30 days';
  
  -- 删除30天前的user_events数据
  DELETE FROM user_events WHERE timestamp < NOW() - INTERVAL '30 days';
  
  -- 删除30天前的heartbeat_logs数据
  DELETE FROM heartbeat_logs WHERE timestamp < NOW() - INTERVAL '30 days';
  
  -- 删除7天前的不活跃会话
  DELETE FROM user_sessions WHERE last_activity < NOW() - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;

-- 创建统计视图
CREATE OR REPLACE VIEW analytics_summary AS
SELECT 
  COUNT(*) as total_views,
  COUNT(DISTINCT session_id) as unique_sessions,
  COUNT(DISTINCT user_id) as unique_users,
  DATE(timestamp) as date,
  page,
  COUNT(*) as page_views
FROM analytics 
WHERE timestamp >= NOW() - INTERVAL '30 days'
GROUP BY DATE(timestamp), page
ORDER BY date DESC, page_views DESC;

-- 创建实时统计视图
CREATE OR REPLACE VIEW realtime_stats AS
SELECT 
  COUNT(DISTINCT us.session_id) as online_users,
  COUNT(DISTINCT a.session_id) as today_views,
  COUNT(DISTINCT a.user_id) as today_users
FROM user_sessions us
LEFT JOIN analytics a ON us.session_id = a.session_id 
  AND a.timestamp >= DATE_TRUNC('day', NOW())
WHERE us.last_activity >= NOW() - INTERVAL '5 minutes';
