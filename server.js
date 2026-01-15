const express = require("express");
const app = express();
const PORT = 3000;

// middleware to parse JSON
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend is working 🔥");
});

// example API
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend bro 😎" });
});

// contact POST route
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // simple validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields are required!" });
  }

  // log the contact message in terminal
  console.log("📩 New Contact Message:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  // send response
  res.json({ success: true });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
