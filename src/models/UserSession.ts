import mongoose from 'mongoose'

const UserSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  ip: {
    type: String,
  },
  lastActivity: {
    type: Number,
    default: Date.now,
  },
  isOnline: {
    type: Boolean,
    default: true,
  },
  pageViews: {
    type: Number,
    default: 0,
  },
  startTime: {
    type: Number,
    default: Date.now,
  },
}, {
  timestamps: true,
})

// 添加索引
UserSessionSchema.index({ sessionId: 1 })
UserSessionSchema.index({ lastActivity: 1 })
UserSessionSchema.index({ isOnline: 1 })

export default mongoose.models.UserSession || mongoose.model('UserSession', UserSessionSchema)
