require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./routes/user.route');
const video = require('./routes/video.route');
const history = require('./routes/history.route');
const likedVideos = require('./routes/likedVideos.route');
const savedVideos = require('./routes/savedVideos.route');
const playlist = require('./routes/playlist.route');
const notes = require('./routes/notes.route');

const app = express();
const URI = process.env['URI'];
const PORT = process.env['PORT'];
app.use(cors());
app.use(express.json());

const client = mongoose.connect(URI,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log("\n <===== Connected =====> \n"))
    .catch(e=>console.log(" \n Could not connect to database. \n Error :- ", e));

app.get('/', (req, res) => {
    res.send("Welcome to the server of Learn It - Video Library App.")
});

app.use('/user', user);

app.use('/video', video);

app.use('/history', history);

app.use('/likedVideos', likedVideos);

app.use('/savedVideos', savedVideos);

app.use('/playlist', playlist);

app.use('/notes', notes);

app.use('*', (req, res) => {
    res.status(404).send("Error 404 - Page not found.")
});

app.listen(PORT, () => {
    console.log(`\n Server Started at port no - ${PORT}`);
});