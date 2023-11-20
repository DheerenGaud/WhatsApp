const mongoose = require("mongoose");

const NormalDataSchema = new mongoose.Schema({
    user_id1: {
        type:String,
        require:true
    },
    user_id2:{
        type:String,
        require:true
    },
    massage: [
        {
            key: Number,
            msg: String,
            time:Date
        }
    ],
    last_massage: {
        key: Number,
        msg: String,
        time:Date
    },
});
const GroupDataSchema = new mongoose.Schema({
    users: [{user_id:String}],
    massageData: [
        {
            massage: String,
            key: Number
        }
    ]
});
const dataSchema = new mongoose.Schema({
    data_type: {
        type: String,
        required: true,
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "group",
    },
    datas:{
        type: mongoose.Schema.Types.Mixed,
        discriminatorKey: 'data_type',
    }
});
dataSchema.discriminator('normal', NormalDataSchema);
dataSchema.discriminator('group', GroupDataSchema);

module.exports = mongoose.model("data", dataSchema);
