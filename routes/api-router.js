import express from 'express';
import { createUser, authenticateUser, getUserInfo, createProduct, getAllProducts} from '../controllers/api-controller.js';
import validateJwtToken from '../middlewares/jwt-auth-middleware.js'

const router = express.Router();

router.post('/register', createUser);
router.post('/login', authenticateUser);
router.get('/profile', validateJwtToken, getUserInfo);
router.post('/products', validateJwtToken, createProduct);
router.get('/products', getAllProducts)



export default router;
