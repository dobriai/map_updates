var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var path = require('path');
var app = express();
var argv = require('minimist')(process.argv.slice(2));

var GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

var httpPort = 'p' in argv ? argv['p'] : 17000;
var udpPort  = 'u' in argv ? argv['u'] : 11000;

var userData = {};

// HTTP Server
app.set('view engine', 'ejs')
app.get('/', function (req, res) {
  res.render('index',
  {
    GOOGLE_API_KEY: GOOGLE_API_KEY,
     LAT_LNG_0: JSON.stringify(lalos[0])
   })
})
// app.use(express.static(path.join(__dirname, '/public')));
var httpServer = http.createServer(app);
httpServer.listen(httpPort);

// The Websocket part
var wss = new WebSocketServer({server: httpServer});
wss.on('connection', function (ws) {
  console.log('New WS connection');
  ws.on('close', function () {
    console.log('Closing WS connection');
  });
});

// UDP server
const dgram = require('dgram');
const udpSvr = dgram.createSocket('udp4');
const msgKeys = ['uid', 'time', 'lat', 'lng'];

udpSvr.on('error', (err) => {
  console.log(`udpSvr error:\n${err.stack}`);
  udpSvr.close();
});
//
udpSvr.on('message', (msg, rinfo) => {
  console.log(`udpSvr got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  var jIn = JSON.parse(msg);
  if (jIn.length != msgKeys.length) {
    console.log(`*** Input has more or fewer values: ${jIn.length}!`)
    return;
  }
  var userUpdate = {};
  jIn.forEach((vv, ii) => {
    userUpdate[msgKeys[ii]] = vv;
  })

  userData[ userUpdate['uid'] ] = userUpdate;
  userData[ userUpdate['uid'] ].delete('uid');  // Remove the key from the values

  var mOut = JSON.stringify(userUpdate);

  wss.clients.forEach(function each(client) {
    client.send(mOut);
  });
});
//
udpSvr.on('listening', () => {
  var address = udpSvr.address();
  console.log(`udpSvr listening ${address.address}:${address.port}`);
});
//
udpSvr.bind(udpPort);

// Fake data
var laloIdx = 0;
var lalos = [{"lat":45.506955944310285,"lng":-73.55724334716797},{"lat":45.507310000000004,"lng":-73.55698000000001},{"lat":45.50762,"lng":-73.55676},{"lat":45.507920000000006,"lng":-73.55654000000004},{"lat":45.508190000000006,"lng":-73.55635000000001},{"lat":45.508390000000006,"lng":-73.55619000000002},{"lat":45.50858,"lng":-73.55604},{"lat":45.50878,"lng":-73.55590000000001},{"lat":45.508970000000005,"lng":-73.55576000000002},{"lat":45.50916,"lng":-73.55561},{"lat":45.50927,"lng":-73.55552999999998},{"lat":45.50939,"lng":-73.55543999999998},{"lat":45.50948,"lng":-73.55537000000004},{"lat":45.50959,"lng":-73.55529000000001},{"lat":45.5097,"lng":-73.55520999999999},{"lat":45.50981,"lng":-73.55513000000002},{"lat":45.509890000000006,"lng":-73.55506000000003},{"lat":45.5103,"lng":-73.55480999999997},{"lat":45.51062,"lng":-73.55464},{"lat":45.510960000000004,"lng":-73.55446},{"lat":45.511,"lng":-73.55444},{"lat":45.51090000000001,"lng":-73.55423000000002},{"lat":45.51082,"lng":-73.55407000000002},{"lat":45.510740000000006,"lng":-73.55390999999997},{"lat":45.51068,"lng":-73.55375000000004},{"lat":45.510630000000006,"lng":-73.55358999999999},{"lat":45.51057,"lng":-73.55342999999999},{"lat":45.5105,"lng":-73.55324999999999},{"lat":45.51043000000001,"lng":-73.55309},{"lat":45.51035,"lng":-73.55291},{"lat":45.510270000000006,"lng":-73.55273},{"lat":45.51021,"lng":-73.55258000000003},{"lat":45.51015,"lng":-73.55245000000002},{"lat":45.510110000000005,"lng":-73.55248},{"lat":45.51005000000001,"lng":-73.55252999999999},{"lat":45.50996000000001,"lng":-73.55261000000002},{"lat":45.50988,"lng":-73.55268000000001},{"lat":45.509800000000006,"lng":-73.55275},{"lat":45.509710000000005,"lng":-73.55282},{"lat":45.5095,"lng":-73.553},{"lat":45.509440000000005,"lng":-73.55304999999998},{"lat":45.509370000000004,"lng":-73.55311},{"lat":45.509310000000006,"lng":-73.55315999999999},{"lat":45.509240000000005,"lng":-73.55322000000001},{"lat":45.509170000000005,"lng":-73.55329},{"lat":45.509080000000004,"lng":-73.55336999999997},{"lat":45.50907,"lng":-73.55333999999999},{"lat":45.509130000000006,"lng":-73.55349999999999},{"lat":45.50925,"lng":-73.55378999999999},{"lat":45.50932,"lng":-73.55392},{"lat":45.50939,"lng":-73.55405999999999},{"lat":45.50949000000001,"lng":-73.55421999999999},{"lat":45.50959,"lng":-73.55442},{"lat":45.50968,"lng":-73.5546},{"lat":45.509730000000005,"lng":-73.55470000000003},{"lat":45.50967000000001,"lng":-73.55474000000004},{"lat":45.50959,"lng":-73.55482},{"lat":45.509730000000005,"lng":-73.55470000000003},{"lat":45.509530000000005,"lng":-73.55429000000004},{"lat":45.50941,"lng":-73.55412000000001},{"lat":45.50927,"lng":-73.55435},{"lat":45.509310000000006,"lng":-73.55443000000002},{"lat":45.50949000000001,"lng":-73.55489},{"lat":45.509510000000006,"lng":-73.55496},{"lat":45.50941,"lng":-73.55504000000002},{"lat":45.50929000000001,"lng":-73.55514},{"lat":45.50916,"lng":-73.55523},{"lat":45.509040000000006,"lng":-73.55533000000003},{"lat":45.50891,"lng":-73.55543},{"lat":45.50878,"lng":-73.55552999999998},{"lat":45.508660000000006,"lng":-73.55563000000001},{"lat":45.50853,"lng":-73.55573000000004},{"lat":45.50844,"lng":-73.55579},{"lat":45.50835000000001,"lng":-73.55586},{"lat":45.50826000000001,"lng":-73.55592000000001},{"lat":45.50817000000001,"lng":-73.55599000000001},{"lat":45.50806,"lng":-73.55606999999998},{"lat":45.507940000000005,"lng":-73.55615999999998},{"lat":45.50782,"lng":-73.55624}];
//
if ('fake' in argv) {
  // Sending (fake) updates to simulate s.o. moving and sending GPS coords
  var updater = setInterval(function () {
    // ws.send(JSON.stringify(process.memoryUsage()), function () { /* ignore errors */ });
    var json = lalos[laloIdx];
    json['uid'] = 'JoeDoe';
    json['time'] = Math.floor(Date.now() / 1000);
    var msg = JSON.stringify(json);
    laloIdx = (laloIdx + 1) % lalos.length;

    console.log('Debug: Sending update: ' + msg);

    wss.clients.forEach(function each(client) {
      client.send(msg);
    });
  }, 1000);
}
