import mongoose from 'mongoose';

const diaryEntrySchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  username: {
    type: String,
    default: 'anonymous@unknown.com'
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'excited', 'angry', 'grateful', 'tired', 'loved', 'other'],
    default: 'other'
  },
  isPrivate: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model('DiaryEntry', diaryEntrySchema);
