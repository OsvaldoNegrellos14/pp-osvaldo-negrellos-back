/* eslint-disable no-empty */
import bcrypt from 'bcrypt';
import User from '../models/user';

// Method to create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, phone, password, age, gender, hobby } = req.body;

    const userFinded = await User.findOne({ email });
    if (userFinded) {
      res.status(400).json({ success: false, info: 'The email is already in use' });
    } else {
      const passwordHash = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        email,
        phone,
        password: passwordHash,
        age,
        gender,
        hobby
      });
      const saveUser = await user.save();
      res.status(201).json({ sucess: true, info: saveUser });
    }
  } catch (error) {
    res.status(400).json({ success: false, info: error });
  }

};

// Method to get all users and get all users by name or/and hobby
export const getUsers = (req, res, next) => {
  if (req.body.name && req.body.hobby) getUserByNameAndHobby(req, res, next);
  else if (req.body.name) getUsersByName(req, res, next);
  else if (req.body.hobby) getUsersByHobby(req, res, next);
  else getAllUsers(req, res, next);
};

const getAllUsers = (req, res, next) => {
  User.find().then(users => {
    if (users.length !== 0) {
      res.status(200).json({ success: true, info: users });
    } else {
      next();
    }
  }).catch(error => {
    next(error);
  });
};

const getUserByNameAndHobby = (req, res, next) => {
  User.find({
    name: {
      $regex: req.body.name,
      $options: '$i'
    },
    hobby: {
      $regex: req.body.hobby,
      $options: '$i'
    }
  }).then(users => {
    if (users.length !== 0) {
      res.status(200).json({ success: true, info: users });
    } else {
      next();
    }
  }).catch(error => {
    next(error);
  });
};

const getUsersByName = (req, res, next) => {
  User.find({
    name: {
      $regex: req.body.name,
      $options: '$i'
    }
  }).then(users => {
    if (users.length !== 0) {
      res.status(200).json({ success: true, info: users });
    } else {
      next();
    }
  }).catch(error => {
    next(error);
  });
};

const getUsersByHobby = (req, res, next) => {
  User.find({
    hobby: {
      $regex: req.body.hobby,
      $options: '$i'
    }
  }).then(users => {
    if (users.length !== 0) {
      res.status(200).json({ success: true, info: users });
    } else {
      next();
    }
  }).catch(error => {
    next(error);
  });
};

// Method to delete a user by ID
export const deleteUserById = (req, res, next) => {

  User.findByIdAndDelete(req.params.id, (error) => {
    if (error) next(error);
    res.status(204).end();
  });
};

// Method to get data of user (name, phone and hobby)
export const getDataUsers = (req, res, next) => {
  const dateLower = new Date();
  const dateGreather = new Date(new Date().setDate(new Date().getDate() - 3));
  User.aggregate([
    {
      $match: {
        age: { $gt: 18 },
        gender: 'female',
        registrationDate: { $gt: dateGreather, $lt: dateLower }
      }
    },
    {
      $group: {
        _id: '$hobby',
        users: {
          $push: {
            name: '$name',
            phone: '$phone',
            hobby: '$hobby'
          }
        }
      }
    }
  ]).then(users => {
    res.status(200).json({ success: true, info: users });
  }).catch(error => {
    next(error);
  });
};