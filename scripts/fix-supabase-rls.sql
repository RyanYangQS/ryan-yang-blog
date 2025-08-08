-- 修复 Supabase RLS 策略问题

-- 检查当前策略
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename IN ('user_sessions', 'user_events', 'heartbeat_logs', 'analytics');

-- 删除现有的可能有问题的策略
DROP POLICY IF EXISTS "User sessions are insertable by everyone" ON user_sessions;
DROP POLICY IF EXISTS "User sessions are viewable by authenticated users" ON user_sessions;
DROP POLICY IF EXISTS "User sessions are updatable by everyone" ON user_sessions;

DROP POLICY IF EXISTS "User events are insertable by everyone" ON user_events;
DROP POLICY IF EXISTS "User events are viewable by authenticated users" ON user_events;

DROP POLICY IF EXISTS "Heartbeat logs are insertable by everyone" ON heartbeat_logs;
DROP POLICY IF EXISTS "Heartbeat logs are viewable by authenticated users" ON heartbeat_logs;

-- 重新创建策略，允许匿名用户插入
CREATE POLICY "User sessions are insertable by everyone" ON user_sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "User sessions are viewable by everyone" ON user_sessions
  FOR SELECT USING (true);

CREATE POLICY "User sessions are updatable by everyone" ON user_sessions
  FOR UPDATE USING (true);

-- 为user_events表创建策略
CREATE POLICY "User events are insertable by everyone" ON user_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "User events are viewable by everyone" ON user_events
  FOR SELECT USING (true);

-- 为heartbeat_logs表创建策略
CREATE POLICY "Heartbeat logs are insertable by everyone" ON heartbeat_logs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Heartbeat logs are viewable by everyone" ON heartbeat_logs
  FOR SELECT USING (true);

-- 确保analytics表的策略也正确
DROP POLICY IF EXISTS "Analytics are insertable by everyone" ON analytics;
DROP POLICY IF EXISTS "Analytics are viewable by authenticated users" ON analytics;

CREATE POLICY "Analytics are insertable by everyone" ON analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Analytics are viewable by everyone" ON analytics
  FOR SELECT USING (true);

-- 验证策略
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename IN ('user_sessions', 'user_events', 'heartbeat_logs', 'analytics');
