import { login } from '../validations/auth.js'
import { generaetSaltHash, validateKey, generateToken } from '../modules/helper.js';
import { message } from '../utils/message.js';
const userTest = {
    username: "songoku",
    hash: "e65286931380113f1e69e4a206775a44482bddc35d0b7d0a584e9689832f3eef30bc078a86bd93ba527555c4f083fbe11c20f7b6ec5a16cfb221a614dfb30cd4e4e74fa2a9ff7fa27cf2520c9446c12a6b66e8fe46c8f20684a46cc6373d4a21626f4c840658bb7012ad1c9e6d9efd26c3789b6d5418f7ef55f88b0ab127bbdc606f1c7d0b99aa8c1297cdf51357e4c0bdfd395512cb4f65a4ffd8cd88c3c20680a9ccb24f33d442cefe64913cd1d6fc632a42eb0e903f0b83f7ffa404c59f5509ac284f716f317810cab392f585ff48d516186e8d27ed61168190d04545c1eaf7cdd0c48f75f78088ef70c0fe8b82d0beb93416b7d004b16442c203e129a908997d631e0e783bcff3d0f5640b310a54d36b6d5611cd263eee3c5ea8585346300dbfc8b5f04b9bb96fa9222a9dcc6fd9c928d751c3da77c539b2e6058cf0224819ba0abc1f0ede5722b65f1c4f3fda83b761cc91097524cc6d06cc8f56d81360367c3fe1a10135240adc6f6a94b7d41030735b3f63e3c4f3d7173fc1f3c32cf9bd8a850278eb41dd615ca7cc839ff3ae4c2eb3fc02ea40813bb51febfc0f3efdbd5fdf1971ca8c9a5f552cc5c5a6bb1b3168bcdcf1606c48f375ccc454be83000432e4ebddbd02f81075e9d8730b042c376e098827c9895ada1302a9969b370c06d613b9c5ce526711098364dc05273444b2f04b2fb2b72c209735de5ee28f43",
    salt: "4d3aae0f1dae89a978cf1324c4229649",
    role: 'admin'
}
class AuthController {
    static async createdPassword(req, res) {
        const password = generaetSaltHash('123123')
        return res.status(200).send(password);
    }

    static async login(req, res) {
        const validate = login.validate(req.body);
        if (validate?.error) 
            return res.status(422).send({ message: message.validate.bodyValidateFail })

        const { username, password } = req.body;
        if (userTest.username !== username) 
            return res.status(404).send({ message: message.auth.userNotFound })

        if (!validateKey(password, userTest.hash, userTest.salt))
            return res.status(400).send({ message: message.auth.passwordError })
        const token = generateToken(false, userTest);

        return res.status(200).send({
            token,
            username: userTest.username,
            role: userTest.role
        });
    }
}

export default AuthController;