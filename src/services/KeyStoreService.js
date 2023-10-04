const { KeyStoreModel } = require('../models/KeyStoreModel');

class KeyStoreService {
    static async createKeyToken(userId, publicKey, privateKey, refreshToken) {
        return await KeyStoreModel.create({
            user: userId,
            publicKey,
            privateKey,
            refreshToken
        });
    }
}

module.exports = KeyStoreService;