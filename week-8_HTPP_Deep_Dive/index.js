// http server that supports 4 routes (/sub, /sum, /mul, /div)
const express = require("express");

const app = express();

const PORT = 3000;

app.get("/sum", function (req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  const sum = a + b;

  res.json({
    ans: sum,
  });
});

app.get("/sub", function (req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  const sub = a - b;
  res.json({
    ans: sub,
  });
});

app.get("/mul", function (req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  const mult = a * b;
  res.json({
    ans: mult,
  });
});

app.get("/div", function (req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  const divide = a / b;
  res.json({
    ans: divide,
  });
});

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
