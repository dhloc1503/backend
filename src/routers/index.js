import middleware from '../middleware/auth.js';
import product from './product.js'
import auth from './auth.js'
import permission from '../middleware/permission.js';
export default function (app) {
    app.use('/auth', auth)
    app.use('/product', middleware.user, permission, product);
}