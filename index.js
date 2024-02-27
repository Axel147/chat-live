const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

//static files
app.use(express.static(path.join(__dirname, 'public')))

//start the server
const server = app.listen(port, async() =>{
    console.log(`Server running on http://localhost:${port}/`)
});

//websockets
const SocketIO = require('socket.io')
const io = SocketIO(server)

io.on('connection', (socket) => {
    console.log('new connection', socket.id);
    
    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data) //chat:message puede llamarse de cualquier modo //emito a todos (incluyendome)
    })
    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data); //emito a todos (menos a mi)
    })
})

