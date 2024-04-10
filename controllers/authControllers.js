const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'newtonSchool';

const decodeToken = (req, res, next) => {
  try {
    let { token } = req.body;
    console.log(token);
    const decodedToken = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ payload: decodedToken, status: 'Success' });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      error: err.message,
    });
  }
};

// Function for user signup
const signup = async (req, res, next) => {
  try {
    // Extract user data from the request body (e.g., username, email, password)
    // Create a new user instance using the User model
    // Save the user to the database
    // Handle success and send a success response with user data
    // Handle errors and send an error response
    const { username, email, password } = req.body;
    if(username&&email&&password){
      const user= new User({username, email,  password});
      console.log("after creating instance");
      const data= await user.save();
      console.log("after save");
      return res.status(201).send({ "message": "User created successfully", data: {user: data}, status: "Success"})
    }
    return res.status(400).send({ "message": "Please provide all required information", "status": "Error" });
} catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',

      error: err.message,
    });
  }
};

// Function for user login
const login = async (req, res, next) => {
  try {
    // Extract user credentials from the request body (e.g., email, password)
    // Check if both email and password are provided; if not, send an error response
    // Find the user in the database by their email
    // If the user is not found, send an error response
    // Compare the provided password with the stored password using bcrypt
    // If passwords do not match, send an error response
    // If passwords match, generate a JWT token with user information
    // Send the token in the response
    const { email, password } = req.body;
    if(email&&password){
        const user= await  User.findOne({ email }).select('email password');
        if(user){
            const isValidUser= bcrypt.compareSync(password, user.password);
            if(isValidUser){
              const token= jwt.sign(user, JWT_SECRET);
              return res.status(200).send({ token, status: "Success" })
              
            }
            return res.status(401).send({ "message": "Invalid email or password", "status": "Error", "error": "Invalid Credentials" });
        }
        return res.status(401).send({ "message": "Invalid email or password", "status": "Error", "error": "Invalid Credentials" });
    }
    return res.status(400).send({ "message": "Please provide all required information", "status": "Error" })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      error: err.message,
    });
  }
};

module.exports = { login, signup, decodeToken };
