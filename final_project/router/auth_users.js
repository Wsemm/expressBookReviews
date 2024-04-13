const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  //write code to check if the username is valid
  return users[username];
}

const authenticatedUser = (username,password)=>{ //returns boolean
  //write code to check if username and password match the one we have in records
  return users[username] === password;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
   //Write your code here
  const { username, password } = req.body;
  if (!isValid(username)) {
    return res.status(400).json({message: "Invalid username"});
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({message: "Invalid username or password"});
  }

  const token = jwt.sign({ username: username }, 'secret_key');
  return res.status(200).json({ message: "Login successful", token: token });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const username = req.session.username;
  const isbn = req.params.isbn;
  const review = req.query.review;
  if (!username)
   {
     return res.status(401).json({ message: "Unauthorized access" }); 
   }
  if (!review) 
  { 
    return res.status(400).json({ message: "Review is required" }); 
  }
  
  if (reviews[isbn] && reviews[isbn][username]) 
  {
     reviews[isbn][username] = review; return res.status(200).json({ message: "Review modified successfully" });
  }
  
  if (!reviews[isbn]) 
  { 
    reviews[isbn] = {}; 
  }
  
  reviews[isbn][username] = review; return res.status(200).json({ message: "Review added successfully" }); 
});

regd_users.delete("/auth/:isbn", (req, res) => {
  //Write your code here



});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
