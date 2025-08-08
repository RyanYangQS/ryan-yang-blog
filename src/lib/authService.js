// 简化的用户认证服务（不依赖Supabase）
export const authService = {
  // 获取当前用户
  async getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  // 注册用户
  async signUp(email, password, userData = {}) {
    // 模拟注册过程
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 检查邮箱是否已存在
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = existingUsers.find(user => user.email === email);
    
    if (existingUser) {
      throw new Error('该邮箱已被注册');
    }
    
    // 创建新用户
    const newUser = {
      id: Date.now().toString(),
      email,
      name: userData.username || email,
      createdAt: new Date().toISOString()
    };
    
    // 保存用户到本地存储
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    return {
      user: newUser,
      session: { access_token: 'mock-token' }
    };
  },

  // 登录用户
  async signIn(email, password) {
    // 模拟登录过程
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 从本地存储获取用户
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('用户不存在，请先注册');
    }
    
    // 模拟密码验证（实际项目中应该验证密码）
    if (password.length < 6) {
      throw new Error('密码长度至少6位');
    }
    
    return {
      user,
      session: { access_token: 'mock-token' }
    };
  },

  // 登出用户
  async signOut() {
    localStorage.removeItem('currentUser');
    window.dispatchEvent(new Event('storage'));
  },

  // 监听认证状态变化
  onAuthStateChange(callback) {
    // 模拟认证状态监听
    const handleStorageChange = () => {
      const user = localStorage.getItem('currentUser');
      callback('SIGNED_IN', user ? JSON.parse(user) : null);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // 返回取消监听的函数
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }
};
