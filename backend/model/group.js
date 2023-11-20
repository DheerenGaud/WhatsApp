const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
    Admin: [{
        user_id: {
            type: String,
            required: true,
        },
        timeOfJoin: {
            type: Date,
            default: Date.now,
            required: true,
        }
    }],
    User: [{
        user_id: {
            type: String,
            required: true,
        },
        timeOfJoin: {
            type: Date,
            default: Date.now,
            required: true,
        }
    }],
    GroupName: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
    },
    accessType: {
        type: String,
        default: "edit"
    },
    count: {
        type: Number,
        default: -1,
        required: true
    }
});

module.exports = mongoose.model("groupChat", GroupSchema);
