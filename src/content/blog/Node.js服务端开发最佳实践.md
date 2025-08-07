---
title: "Node.js服务端开发最佳实践"
date: "2024-08-20"
author: "杨青松"
tags: ["Node.js", "服务端", "Express", "后端"]
excerpt: "深入探讨Node.js服务端开发的核心技术和最佳实践，从Express框架到性能优化，掌握现代Node.js应用开发。"
coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
---

# Node.js服务端开发最佳实践

## 引言

Node.js作为JavaScript运行时环境，在服务端开发中发挥着重要作用。本文将深入探讨Node.js服务端开发的核心概念和最佳实践。

## 核心概念

### 1. 事件循环

```javascript
// 理解事件循环
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// 输出顺序: 1, 4, 3, 2
```

### 2. 异步编程

```javascript
// 使用async/await
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('获取用户数据失败:', error);
    throw error;
  }
}

// 使用Promise.all并行处理
async function fetchMultipleUsers(userIds) {
  const promises = userIds.map(id => fetchUserData(id));
  const users = await Promise.all(promises);
  return users;
}
```

## Express框架

### 1. 基础设置

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// 中间件配置
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 限流配置
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100 // 限制每个IP 15分钟内最多100个请求
});
app.use(limiter);
```

### 2. 路由组织

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();
const { validateUser } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: '获取用户列表失败' });
  }
});

router.post('/', authenticate, validateUser, async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: '创建用户失败' });
  }
});

module.exports = router;
```

### 3. 中间件开发

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: '访问被拒绝' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: '无效的token' });
  }
};

module.exports = { authenticate };
```

## 数据库操作

### 1. MongoDB集成

```javascript
const mongoose = require('mongoose');

// 连接数据库
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 定义模型
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
```

### 2. Redis缓存

```javascript
const redis = require('redis');
const client = redis.createClient();

// 缓存中间件
const cache = (duration) => {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;
    
    try {
      const cached = await client.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }
      
      res.sendResponse = res.json;
      res.json = (body) => {
        client.setex(key, duration, JSON.stringify(body));
        res.sendResponse(body);
      };
      
      next();
    } catch (error) {
      next();
    }
  };
};
```

## 错误处理

### 1. 全局错误处理

```javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: '数据验证失败',
      details: err.message
    });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: '无效的ID格式'
    });
  }
  
  res.status(500).json({
    error: '服务器内部错误'
  });
};

module.exports = errorHandler;
```

### 2. 异步错误处理

```javascript
// 包装异步路由
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 使用示例
router.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));
```

## 性能优化

### 1. 集群模式

```javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  require('./app');
}
```

### 2. 内存管理

```javascript
// 监控内存使用
setInterval(() => {
  const used = process.memoryUsage();
  console.log({
    rss: `${Math.round(used.rss / 1024 / 1024 * 100) / 100} MB`,
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024 * 100) / 100} MB`,
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`
  });
}, 30000);
```

## 安全最佳实践

### 1. 输入验证

```javascript
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      error: '数据验证失败',
      details: error.details[0].message
    });
  }
  
  next();
};
```

### 2. SQL注入防护

```javascript
// 使用参数化查询
const getUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  const [rows] = await pool.execute(query, [id]);
  return rows[0];
};

// 使用ORM
const getUser = async (id) => {
  return await User.findOne({ _id: id });
};
```

## 测试

### 1. 单元测试

```javascript
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('User API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  
  test('GET /users should return empty array', async () => {
    const response = await request(app)
      .get('/users')
      .expect(200);
    
    expect(response.body).toEqual([]);
  });
  
  test('POST /users should create new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    };
    
    const response = await request(app)
      .post('/users')
      .send(userData)
      .expect(201);
    
    expect(response.body.name).toBe(userData.name);
    expect(response.body.email).toBe(userData.email);
  });
});
```

### 2. 集成测试

```javascript
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
```

## 部署

### 1. PM2配置

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'my-app',
    script: './app.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
```

### 2. Docker配置

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

## 总结

Node.js服务端开发需要掌握事件循环、异步编程、框架使用、数据库操作、错误处理、性能优化、安全防护和测试等多个方面。通过合理运用这些技术，我们可以构建出高效、安全、可维护的Node.js应用。
