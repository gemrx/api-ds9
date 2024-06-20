import 'dotenv/config'
import User from '../models/user-model.js'
import Product from '../models/product-model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createUser(request, response) {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const newUser = new User({
            username: request.body.username,
            password: hashedPassword,
            fullName: request.body.fullName
        });
        await newUser.save();
        response.status(200).json({ message: 'User created' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal error, failed to create user' });
    }
}

export async function authenticateUser(request, response) {
    try {
        const userFound = await User.findOne({ username: request.body.username });

        if (userFound === null) {
            response.status(404).json({ error: 'Invalid credentials' });
            return;
        }

        const passwordMatch = await bcrypt.compare(request.body.password, userFound.password);

        if (!passwordMatch) {
            response.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        response.status(200).json({ token: token });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal error, failed to authenticate user' });
    }
}

export async function getUserInfo(request, response) {
    try {
        const userFound = await User.findById(request.userId);

        if (userFound === null) {
            response.status(404).json({ error: 'Invalid user id' });
            return;
        }

        response.status(200).json({
            username: userFound.username,
            password: userFound.password,
            fullName: userFound.fullName
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal error, failed to get user information' });
    }
}

export async function createProduct(request, response) {
    try {
        const newProduct = new Product(request.body);
        await newProduct.save();
        response.status(200).json({ message: 'Product created' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal error, failed to create product' });
    }
}

export async function getAllProducts(request, response) {
    try {
        const products = await Product.find(null, 'name description price');
        response.status(200).json(products);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal error, failed to get all products' });
    }
}



