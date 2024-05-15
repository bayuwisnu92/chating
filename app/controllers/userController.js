const { User } = require('../models');
const bcrypt = require('bcrypt');
const path = require('path'); 
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;
    
    if (password !== confirm_password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      passwordHash: hashedPassword,
      passwordSalt: salt 
    });

    res.status(201).redirect('/user/login');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const passwordHashAsString = String(user.passwordHash);
    const passwordMatch = await bcrypt.compare(password, passwordHashAsString);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    const token = jwt.sign({ id: user.id },
      config.secret,
      {
       algorithm: 'HS256',
       allowInsecureKeySizes: true,
       expiresIn: 86400, // 24 hours
      });

    req.session.token = token;
    res.status(201).redirect('/chat');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
};

exports.getLoginPage = (req, res) => {
  res.sendFile('login.html', { root: path.join(__dirname, '../views') });
};

exports.getRegisterPage = (req, res) => {
  res.sendFile('register.html', { root: path.join(__dirname, '../views') });
};