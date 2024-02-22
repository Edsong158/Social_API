const { model, Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },

        reactionBody: {
            type: String,
            required: [true, 'Please enter your reaction here'],
            minLength: 1,
            maxLength: 280
        },

        username: {
            type: String,
            require: true
        },

        createAt: {
            type: Date,
            default: Date.now,
            get: function (timestamp) {
                return dayjs(timestamp).format('MM-DD-YYYY HH:mm:ss')
            }
        }
    }
);


module.exports = reactionSchema; 