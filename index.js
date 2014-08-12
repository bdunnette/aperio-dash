var Hapi = require('hapi');
var Confidence = require('confidence');
var config = require('./config.json');
var configStore = new Confidence.Store(config);
console.log(configStore);
var server = new Hapi.Server(configStore.get('/server/port') || 3000);

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
  }
});

server.pack.register({
  plugin: require('lout')
}, function () {
  server.start(function () {
    console.log('Server running at:', server.info.uri);
  });
});