// This is to get around cors in local dev when we can't control settings from es
var app = require('express')();
var proxy = require('http-proxy-middleware');
var cors = require('cors');
var constants = require('./constants');
var _ = require('lodash');

/* This will find an elasticsearch port when it meets these criteria
 - Ran with docker
 - Container is named something with elasticsearch
 Standard Out will look something like this when we do a docker ps.  This pulls the part before the ->9200/tcp
 "/usr/local/bin/dock…"   7 days ago          Up 16 hours         0.0.0.0:32786->9200/tcp, 0.0.0.0:32785->9300/tcp   dox-compose_elasticsearch_1_eda7d02b7c4e
*/

const IP_ADD_REGEX = new RegExp('(?<ip>\\d.\\d.\\d.\\d):(?<port>\\d*)->9200\\/tcp');
const { exec } = require('child_process');
exec('docker ps | grep elasticsearch', (err, stdout, stderr) => {
  const output = (stdout || '').match(IP_ADD_REGEX);

  const ip = _.get(output, 'groups.ip', constants.ELASTIC_IP);
  const port = _.get(output, 'groups.port', constants.ELASTIC_PORT);


  app.use('*', cors({ origin: '*' }), proxy({
    target: `http://${ip}:${port}`,
    changeOrigin: true
  }));
  app.listen(constants.PROXY_PORT);
});
