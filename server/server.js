const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());


app.get('/', (req, res) => {
  res.json({ info: 'This is a test!'});
});

app.listen(port, () => {
  console.log(`Webvel Server listening on port ${port}`);
});

