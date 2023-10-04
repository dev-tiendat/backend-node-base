const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'user';
const COLLECTION_NAME = 'users';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 30,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        maxLength: 100
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
    },
    verified: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: ''
    },
    fullName: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    dateOfBirth: {
        type: Date,
        default: new Date('2000-01-01')
    },
    phoneNumber: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

const UserModel = model(DOCUMENT_NAME, userSchema);

module.exports = { UserModel, DOCUMENT_NAME, COLLECTION_NAME }