const mongoose = require('mongoose');

// 连接数据库
async function initDatabase() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      console.error('MONGODB_URI environment variable is not set');
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 创建索引
    const Analytics = mongoose.model('Analytics', new mongoose.Schema({
      page: String,
      url: String,
      userAgent: String,
      ip: String,
      referrer: String,
      sessionId: { type: String, required: true },
      userId: String,
      timestamp: { type: Number, default: Date.now },
      screenSize: String,
      viewportSize: String,
      language: String,
      timezone: String,
    }, { timestamps: true }));

    const UserSession = mongoose.model('UserSession', new mongoose.Schema({
      sessionId: { type: String, required: true, unique: true },
      userId: String,
      userAgent: String,
      ip: String,
      lastActivity: { type: Number, default: Date.now },
      isOnline: { type: Boolean, default: true },
      pageViews: { type: Number, default: 0 },
      startTime: { type: Number, default: Date.now },
    }, { timestamps: true }));

    // 创建索引
    await Analytics.createIndexes();
    await UserSession.createIndexes();
    
    console.log('✅ Database indexes created');

    // 添加一些测试数据
    const testAnalytics = [
      {
        page: '/',
        url: 'http://localhost:3000/',
        userAgent: 'Mozilla/5.0 (Test Browser)',
        sessionId: 'test-session-1',
        timestamp: Date.now(),
        screenSize: '1920x1080',
        viewportSize: '1920x937',
        language: 'zh-CN',
        timezone: 'Asia/Shanghai'
      },
      {
        page: '/blog',
        url: 'http://localhost:3000/blog',
        userAgent: 'Mozilla/5.0 (Test Browser)',
        sessionId: 'test-session-2',
        timestamp: Date.now() - 3600000, // 1小时前
        screenSize: '1920x1080',
        viewportSize: '1920x937',
        language: 'zh-CN',
        timezone: 'Asia/Shanghai'
      }
    ];

    await Analytics.insertMany(testAnalytics);
    console.log('✅ Test analytics data inserted');

    const testSessions = [
      {
        sessionId: 'test-session-1',
        userId: 'test-user-1',
        userAgent: 'Mozilla/5.0 (Test Browser)',
        lastActivity: Date.now(),
        isOnline: true,
        pageViews: 5
      },
      {
        sessionId: 'test-session-2',
        userId: 'test-user-2',
        userAgent: 'Mozilla/5.0 (Test Browser)',
        lastActivity: Date.now() - 1800000, // 30分钟前
        isOnline: false,
        pageViews: 3
      }
    ];

    await UserSession.insertMany(testSessions);
    console.log('✅ Test session data inserted');

    console.log('✅ Database initialization completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

initDatabase();
