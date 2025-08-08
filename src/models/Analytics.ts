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
  },
}, {
  timestamps: true,
})

export default mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema)
