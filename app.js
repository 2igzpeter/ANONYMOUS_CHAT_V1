var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var ent = require('ent');
var encode = require('ent/encode');
var decode = require('ent/decode');
app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');



//ROUTE HOME
app.get('/tchat', (req, res) => {
    res.render('tchat.ejs');
  });


  

  //SOCKET FX
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + ent.encode(msg));
    });
  });

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', ent.encode(msg));
    });
  });
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


  io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});



  
server.listen(8080, () => {
  console.log('listening on *:8080');
});