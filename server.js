const express = require("express");
const connectToDb = require("./config/db");

const app = express();

// Connect to DB
connectToDb();

//  Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("api running"));

// Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server has successfully started on port ${PORT}`)
);
