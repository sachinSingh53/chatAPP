const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');

const methodOverride = require('method-override');
const { createServer } = require('node:http');
const { Server } = require('socket.io');


const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

// const chatRoutes = require('./routes/home');
app.get('/chat',(req,res)=>{
    res.render('home');
})


app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));



// app.use('/chat',chatRoutes);




server.listen(3000,()=>{
    console.log('listning on port 3000');
})