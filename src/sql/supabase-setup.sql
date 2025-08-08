-- 创建博客文章表
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE
);

-- 创建评论表
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  author VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建分析数据表
CREATE TABLE IF NOT EXISTS analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_page ON analytics(page);

-- 启用行级安全策略 (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- 为posts表创建策略
CREATE POLICY "Posts are viewable by everyone" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Posts are insertable by authenticated users" ON posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Posts are updatable by authenticated users" ON posts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Posts are deletable by authenticated users" ON posts
  FOR DELETE USING (auth.role() = 'authenticated');

-- 为comments表创建策略
CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Comments are insertable by everyone" ON comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Comments are deletable by authenticated users" ON comments
  FOR DELETE USING (auth.role() = 'authenticated');

-- 为analytics表创建策略
CREATE POLICY "Analytics are insertable by everyone" ON analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Analytics are viewable by authenticated users" ON analytics
  FOR SELECT USING (auth.role() = 'authenticated');

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 插入示例数据
INSERT INTO posts (title, slug, content, excerpt, tags, featured) VALUES
(
  'React Hooks深度解析',
  'react-hooks-deep-dive',
  '# React Hooks深度解析

## 引言
React Hooks是React 16.8引入的新特性，它让我们可以在函数组件中使用状态和其他React特性。

## 核心Hooks

### useState
useState是最基础的Hook，用于在函数组件中添加状态。

```javascript
const [count, setCount] = useState(0);
```

### useEffect
useEffect用于处理副作用，相当于类组件中的componentDidMount、componentDidUpdate和componentWillUnmount的组合。

```javascript
useEffect(() => {
  // 副作用逻辑
  return () => {
    // 清理逻辑
  };
}, [dependencies]);
```

## 自定义Hooks
我们可以创建自定义Hooks来复用状态逻辑。

```javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}
```

## 最佳实践
1. 只在函数组件的顶层调用Hooks
2. 不要在循环、条件或嵌套函数中调用Hooks
3. 自定义Hooks必须以"use"开头

## 总结
Hooks让React函数组件变得更加强大和灵活，是现代React开发的核心。',
  '深入解析React Hooks的使用方法和最佳实践，包括useState、useEffect等核心Hook的详细用法。',
  ARRAY['React', 'Hooks', 'JavaScript'],
  TRUE
),
(
  'TypeScript最佳实践与设计模式',
  'typescript-best-practices',
  '# TypeScript最佳实践与设计模式

## 引言
TypeScript作为JavaScript的超集，提供了强大的类型系统和面向对象编程能力。

## 类型系统

### 基础类型
```typescript
let name: string = "Ryan";
let age: number = 30;
let isActive: boolean = true;
let skills: string[] = ["React", "TypeScript"];
```

### 接口定义
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean; // 可选属性
}
```

## 设计模式

### 单例模式
```typescript
class Database {
  private static instance: Database;
  
  private constructor() {}
  
  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
```

### 工厂模式
```typescript
interface Product {
  operation(): string;
}

class ConcreteProductA implements Product {
  operation(): string {
    return "Product A";
  }
}

class ProductFactory {
  createProduct(type: string): Product {
    switch (type) {
      case "A":
        return new ConcreteProductA();
      default:
        throw new Error("Unknown product type");
    }
  }
}
```

## 最佳实践
1. 优先使用接口而不是类型别名
2. 合理使用泛型提高代码复用性
3. 避免使用any类型
4. 使用严格模式配置

## 总结
TypeScript的类型系统和设计模式能够显著提高代码质量和可维护性。',
  '探讨TypeScript的核心概念、设计模式应用和最佳实践，帮助开发者写出更高质量的代码。',
  ARRAY['TypeScript', '设计模式', 'JavaScript'],
  TRUE
);
