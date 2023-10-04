const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { OAuth2Client } = require('google-auth-library')
const { BadRequestError, AuthFailureError } = require('../core/ApiError')
const AuthUtils = require('../utils/AuthUtils')
const { UserModel } = require('../models/UserModel')
const KeyStoreService = require('./KeyStoreService')
const UserService = require('./UserService')

const client = new OAuth2Client(process.env.GOOGLE_APP_ID);

class AccessService {
    static async register(username, email, password) {
        const holderUser = await UserService.findByEmail(email);
        if (holderUser) throw new BadRequestError({
            message: 'Người dùng đã được đăng ký, vui lòng thử lại!'
        });

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = await UserService.create({
            username,
            email,
            password: passwordHash
        });

        const { privateKey, publicKey } = AuthUtils.generateKeyTokenPair();
        const tokens = AuthUtils.createTokens({
            userId: newUser._id,
            email: newUser.email
        }, publicKey, privateKey);
        await KeyStoreService.createKeyToken(newUser._id, publicKey, privateKey, tokens.refreshToken);
        return {
            user: AuthUtils.getUserData(newUser),
            tokens
        }
    }

    static async signIn(usernameOrEmail, password) {
        const holderUser = !usernameOrEmail.includes('@') ? await UserService.findByUsername(usernameOrEmail) : await UserService.findByEmail(usernameOrEmail);
        if (!holderUser) throw new BadRequestError({
            message: 'Người dùng chưa được đăng ký'
        });
    
        const match = await bcrypt.compare(password, holderUser.password);
        console.log("match::" + match);
        if (!match) throw new AuthFailureError({
            message: 'Mật khẩu không chính xác'
        });

        const { privateKey, publicKey } = AuthUtils.generateKeyTokenPair();
        const tokens = AuthUtils.createTokens({
            userId: holderUser._id,
            email: holderUser.email
        }, publicKey, privateKey);
        await KeyStoreService.createKeyToken(holderUser._id, publicKey, privateKey, tokens.refreshToken);
        return {
            user: AuthUtils.getUserData(holderUser),
            tokens
        }
    }

    
    static async googleAuth(token) {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_APP_ID
        });
        const payload = await ticket.getPayload();
        c

        return { payload };
    }
}

module.exports = AccessService;