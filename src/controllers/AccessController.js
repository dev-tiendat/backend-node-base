const AccessService = require('../services/AccessService')
const { SuccessMsgResponse, SuccessResponse } = require('../core/ApiResponse')

class AccessController {
    static async register(req, res) {
        const { username, email, password } = req.body;
        
        const data = await AccessService.register(username, email, password);

        new SuccessResponse({
            message: 'Register Successful',
            data: data
        }).send(res);
    }

    static async signIn(req, res) {
        const { usernameOrEmail, password } = req.body;
        const data = await AccessService.signIn(usernameOrEmail, password);

        new SuccessResponse({
            message: 'Login Successful',
            data: data
        }).send(res);
    }

    static async signInWithGoogle(req,res){
        const {token} = req.body;
        
        const data = await AccessService.googleAuth(token);

        new SuccessResponse({
            message: 'Login successful',
            data: data
        }).send(res);
    }
}

module.exports = AccessController;