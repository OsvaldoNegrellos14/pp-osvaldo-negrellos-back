import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Method to validate the user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next({ name: 'MissingData' });
  } else {
    const user = await User.findOne({ email });

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
      next({ name: 'false' });
    } else {
      const userDataToken = {
        id: user.id,
        email: user.email
      };

      const token = jwt.sign(userDataToken, process.env.SECRET);

      res.status(200).json({
        name: user.name,
        email: user.email,
        token
      });
    }
  }
};