import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Mail, Lock, Save, Edit3 } from "lucide-react";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      setFormData({
        nickname: userData.name || userData.nickname || "",
        email: userData.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        setMessage("新密码和确认密码不匹配");
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser = {
        ...currentUser,
        name: formData.nickname,
        nickname: formData.nickname,
        email: formData.email
      };

      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      window.dispatchEvent(new Event("storage"));
      
      setMessage("个人信息更新成功！");
      setIsEditing(false);
    } catch (error) {
      setMessage("更新失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">请先登录</h1>
          <p className="text-gray-400 mb-6">您需要登录才能访问个人信息页面。</p>
          <Link to="/" className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>返回首页</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>返回首页</span>
          </Link>
        </div>

        <div className="glass-effect rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">个人信息</h1>
            <button onClick={() => setIsEditing(!isEditing)} className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? "取消编辑" : "编辑信息"}</span>
            </button>
          </div>

          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {currentUser.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                {currentUser.name || currentUser.nickname || "用户"}
              </h2>
              <p className="text-gray-400">{currentUser.email}</p>
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-lg mb-6 ${message.includes("成功") ? "bg-green-900/20 border border-green-500 text-green-400" : "bg-red-900/20 border border-red-500 text-red-400"}`}>
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">昵称</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" name="nickname" value={formData.nickname} onChange={handleInputChange} disabled={!isEditing} className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50" placeholder="请输入昵称" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">邮箱</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={!isEditing} className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50" placeholder="请输入邮箱" />
              </div>
            </div>

            {isEditing && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">当前密码</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="请输入当前密码" />
                </div>
              </div>
            )}

            {isEditing && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">新密码</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input type="password" name="newPassword" value={formData.newPassword} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="请输入新密码" />
                </div>
              </div>
            )}

            {isEditing && formData.newPassword && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">确认新密码</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="请再次输入新密码" />
                </div>
              </div>
            )}
          </div>

          {isEditing && (
            <div className="mt-8 flex justify-end">
              <button onClick={handleSave} disabled={loading} className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>保存中...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>保存更改</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
