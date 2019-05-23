const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.Deleted = {
    isDeleted: {
        type: Boolean,
        default: false,
        index: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date
    }
};

exports.qNotDeleted = () => {
    return {
        "deleted.isDeleted": {$ne: true}
    };
};
