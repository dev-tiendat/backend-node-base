const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const { InternalError } = require('../core/ApiError')

class AuthUtils {
    static generateKeyToken = () => crypto.randomBytes(64).toString('hex');

    static generateKeyTokenPair = () => {
        const privateKey = AuthUtils.generateKeyToken();
        const publicKey = AuthUtils.generateKeyToken();

        return { privateKey, publicKey };
    }

    static createAccessToken(payload, publicKey) {
        const accessToken = jwt.sign(payload, publicKey, {
            expiresIn: '2 days'
        });

        if (!accessToken) throw InternalError();

        return accessToken;
    }

    static createRefreshToken(payload, privateKey) {
        const refreshToken = jwt.sign(payload, privateKey, {
            expiresIn: '90 days'
        });

        if (!refreshToken) throw InternalError();

        return refreshToken;
    }

    static createTokens(payload, publicKey, privateKey) {
        const accessToken = AuthUtils.createAccessToken(payload, publicKey);
        const refreshToken = AuthUtils.createRefreshToken(payload, privateKey);

        return { accessToken, refreshToken };
    }

    static getUserData(user) {
        const data = _.pick(user, ['_id', 'username', 'email']);
        return data;
    }
}

module.exports = AuthUtils;