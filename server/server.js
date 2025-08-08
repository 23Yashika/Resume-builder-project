import express from 'express';
const app = express();
app.get('/', (req, res) => {
  res.status(200).send('server chal rha h!');
});
app.listen(5000, () => {
        console.log(`server chal rha h`);
    })