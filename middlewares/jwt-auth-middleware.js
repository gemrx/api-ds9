import jwt from 'jsonwebtoken';

function validateJwtToken(request, response, next) {
    const authHeader = request.get('Authorization');
    if (!authHeader) {
        return response.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET); 
        request.userId = decodedPayload.id;
        next();
    } catch (error) {
        console.error(error);
        return response.status(401).json({ error: 'Invalid token' });
    }
}

export default validateJwtToken;