import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
	const token = req.headers['authorization'];
	if (!token) return res.sendStatus(401);

	const accessToken = token.split(' ')[1];
	if (!accessToken) return res.sendStatus(401);

	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};

export default authenticateToken;
