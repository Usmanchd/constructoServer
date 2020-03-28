const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('client/build'));
console.log('here');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
console.log('here');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
