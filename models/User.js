const { model, Schema } = require('mongoose');
const { hash, compare } = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            require: [true, 'You must enter a Username'],
            unique: true,
            trimmed: true
        },

        email: {
            type: String,
            required: [true, 'Your must enter an email address'],
            unique: true,
            validate: {
                validator(val) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ig.test(val);
                },
                message: 'Your need to enter a valid email'
            }
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
);

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const hashedPassword = await hash(this.password, 10);
            this.password = hashedPassword;
        } catch (error) {
            return next(error);
        }
    }
    next();
});

userSchema.methods.validatePass = async function 
(formPassword) {
    const is_valid = await compare(formPassword, hash, function(err, result){console.log('good password')});

    return is_valid;
}

userSchema.set('toJSON', {
    transform: (_, user) => {
        delete user.password;
        delete user.__v;
        return user;
    },
});

const User = model('User', userSchema);

module.exports = User;