import express from 'express';
import { createUser, authenticateUser, showUserProfile, createProduct} from '../controllers/api-controller.js';
import validateJwtToken from '../middlewares/jwt-auth-middleware.js'

const router = express.Router();

router.post('/register', createUser);
router.post('/login', authenticateUser);
router.post('/products', validateJwtToken, createProduct);
router.get('/profile', validateJwtToken, showUserProfile);

export default router;
