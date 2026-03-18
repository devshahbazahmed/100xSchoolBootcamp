const express = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware");

const app = express();
app.use(express.json());

const notes = [];
const users = [
  {
    usrename: "harkirat",
    paswword: "admin123",
  },
];

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(201).json({
      message: "User with this username already exists",
    });
  }

  users.push({
    username,
    password,
  });

  res.json({
    message: "You have signed up",
  });
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!userExists) {
    return res.status(404).json({ error: "User does not exists" });
  }

  // json web tokens
  const token = jwt.sign(
    {
      username: username,
    },
    "admin123"
  );

  res.json({
    token,
  });
});

// POST - create a new note
app.post("/notes", authMiddleware, function (req, res) {
  const username = req.username;
  const note = req.body.note;
  notes.push({ note, username });

  res.json({
    message: "Done!",
  });
});

// GET - get all my notes -- AUTHENTICATED ENDPOINT
app.get("/notes", authMiddleware, function (req, res) {
  const username = req.username;
  const userNotes = notes.filter((note) => note.username === username);

  res.json({
    notes: userNotes,
  });
});

app.get("/", function (req, res) {
  res.sendFile(
    "/Users/macbook/Desktop/100xSchoolBootcamp/week-9_Authentication/frontend/index.html"
  );
});
app.get("/signup", function (req, res) {
  res.sendFile(
    "/Users/macbook/Desktop/100xSchoolBootcamp/week-9_Authentication/frontend/signup.html"
  );
});
app.get("/signin", function (req, res) {
  res.sendFile(
    "/Users/macbook/Desktop/100xSchoolBootcamp/week-9_Authentication/frontend/signin.html"
  );
});

app.listen(3000);
