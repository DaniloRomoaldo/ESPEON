import jwt from 'jsonwebtoken';
import 'dotenv/config';


const authMiddleware = (req, res, next) => {

    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({message: "Acesso Negado!"})
    }

    try {
        
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: "Acesso Negado!"})
    }
};

export default authMiddleware;