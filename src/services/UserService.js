const { UserModel } = require('../models/UserModel');

class UserService {
    static async create(user) {
        return await UserModel.create(user);
    }

    static async findByUsername(username, select = { _id: 1, username: 1, email: 1, password: 1 }) {
        return await UserModel.findOne({ username }).select(select).lean();
    }

    static async findByEmail(email, select = { _id: 1, username: 1, email: 1, password: 1 }) {
        return await UserModel.findOne({ email }).select(select).lean();
    }
}

module.exports = UserService;