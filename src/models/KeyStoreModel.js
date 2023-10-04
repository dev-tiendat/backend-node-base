const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'keyToken';
const COLLECTION_NAME = 'keyTokens';

const keyStoreSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    publicKey: {
        type: String,
        required: true,
        trim: true
    },
    privateKey: {
        type: String,
        required: true,
        trim: true
    },
    refreshToken: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    collation: COLLECTION_NAME
});

const KeyStoreModel = model(DOCUMENT_NAME, keyStoreSchema);

module.exports = { KeyStoreModel, DOCUMENT_NAME, COLLECTION_NAME }