const express = require('express');
const app = express();
const PORT =  3000;

app.use(express.json());


let users = [
  { email: "alice@example.com", password: "1234" },
  { email: "john@example.com", password: "abcd" }
];


app.put('/user', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  user.password = password;
  res.json({ message: "Password updated successfully" });
});


app.delete('/user', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "user is required" });
  }

  const index = users.findIndex(u => u.email === email);

  if (index === -1) {
    return res.status(404).json({ message: "Email not found" });
  }

  users.splice(index, 1);
  res.json({ message: "User deleted successfully" });
});

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
