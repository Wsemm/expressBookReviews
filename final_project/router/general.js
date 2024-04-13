const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
public_users.use(express.json());


let myPromise = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve("Promise resolved")
  },6000)})

public_users.get("/users",(req,res)=>
{
res.send(users);
});
public_users.post("/register", (req,res) => {
  const { username, password } = req.body;
  if (!username || !password) 
  { 
    return res.status(400).json({message: "Username and password are required"}); 
  }
  if (users[username]) 
  {
     return res.status(409).json({message: "Username already exists"}); 
  }
  users[username] = password;
  users.push(req.body)
  return res.status(201).json({message: "User registered successfully"}); 
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  res.send(books);
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const details_isbn = {};

  for (let key in books) {
    if (books[key].isbn === isbn) {
      details_isbn[key] = books[key];
    }
  }

  if(Object.keys(details_isbn).length > 0) {
    return res.status(200).json(details_isbn);
  } else {
    return res.status(404).json({message: "invaild isbn number"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author', function(req, res) {
    //Write your code here
  const author = req.params.author;
  const authorBooks = {};

  for (let key in books) {
    if (books[key].author === author) {
      authorBooks[key] = books[key];
    }
  }

  if(Object.keys(authorBooks).length > 0) {
    return res.status(200).json(authorBooks);
  } else {
    return res.status(404).json({message: "Author not found"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const titleBooks = {};

  for (let key in books) {
    if (books[key].title === title) {
      titleBooks[key] = books[key];
    }
  }
  if(Object.keys(titleBooks).length > 0) {
    return res.status(200).json(titleBooks);
  } else {
    return res.status(404).json({message: "title not found"});
  }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const reviewList = [];

  for (let key in books) {
    if (books[key].isbn === isbn) {
     res.send(books[key].reviews);
    }
  }
  if(reviewList.length > 0) {
    return res.status(200).json(reviewList);
  } else {
    return res.status(404).json({message: "reviews not found"});
  }
});

// using Promise
// myPromise.then((successMessage) => {
//   public_users.get("/users",(req,res)=>
// {
// res.send(users);
// });
// })


// myPromise.then((successMessage) => {
//   public_users.get('/isbn/:isbn',function (req, res) {
//     //Write your code here
//     const isbn = req.params.isbn;
//     const details_isbn = {};
  
//     for (let key in books) {
//       if (books[key].isbn === isbn) {
//         details_isbn[key] = books[key];
//       }
//     }
  
//     if(Object.keys(details_isbn).length > 0) {
//       return res.status(200).json(details_isbn);
//     } else {
//       return res.status(404).json({message: "invaild isbn number"});
//     }
//    });
// })



// myPromise.then((successMessage) => {
//   public_users.get('/author/:author', function(req, res) {
//     //Write your code here
//   const author = req.params.author;
//   const authorBooks = {};

//   for (let key in books) {
//     if (books[key].author === author) {
//       authorBooks[key] = books[key];
//     }
//   }

//   if(Object.keys(authorBooks).length > 0) {
//     return res.status(200).json(authorBooks);
//   } else {
//     return res.status(404).json({message: "Author not found"});
//   }
// });
// })



// myPromise.then((successMessage) => {
//   public_users.get('/title/:title',function (req, res) {
//     //Write your code here
//     const title = req.params.title;
//     const titleBooks = {};
  
//     for (let key in books) {
//       if (books[key].title === title) {
//         titleBooks[key] = books[key];
//       }
//     }
//     if(Object.keys(titleBooks).length > 0) {
//       return res.status(200).json(titleBooks);
//     } else {
//       return res.status(404).json({message: "title not found"});
//     }
//   });
// })


module.exports.general = public_users;
