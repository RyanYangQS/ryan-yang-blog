import mongoose from 'mongoose'

const AnalyticsSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
  },
  ip: {
    type: String,
  },
  referrer: {
    type: String,
  },
  sessionId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  timestamp: {
    type: Number,
    default: Date.now,
  },
  screenSize: {
    type: String,
  },
  viewportSize: {
    type: String,
  },
  language: {
    type: String,
  },
  timezone: {
    type: String,
  },
}, {
  timestamps: true,
})

// 添加索引以提高查询性能
AnalyticsSchema.index({ sessionId: 1 })
AnalyticsSchema.index({ createdAt: 1 })
AnalyticsSchema.index({ page: 1 })

export default mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema)
