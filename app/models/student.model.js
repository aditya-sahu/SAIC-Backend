const mongoose = require('mongoose');

const headAngleData = mongoose.Schema({
    angle: {
       type: Boolean
    },
    ts: {
      type: Date,
      default: Date.now()
    }
});

const presenceData = mongoose.Schema({
    present: {
       type: Boolean
    },
    ts: {
      type: Date,
      default: Date.now()
    }
});

const emotionData = mongoose.Schema({
    emotion: {
       type: String
    },
    ts: {
      type: Date,
      default: Date.now()
    }
});

const StudentSchema = mongoose.Schema({
    name: {
       type: String,
       required: true
    },
    headActivity: {
        type:[headAngleData]
    },
    presenceActivity: {
        type:[presenceData]
    },
    emotionActivity: {
        type:[emotionData]
    }
});

module.exports = mongoose.model('Student', StudentSchema);