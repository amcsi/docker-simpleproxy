const dns = require('dns');
const child_process = require('child_process');

const localPort = process.env.LOCAL_PORT || '8080';
const [host, port] = process.env.PROXY_TO_HOST_IP_PORT.split(':');

console.info(`Preparing proxy to ${process.env.PROXY_TO_HOST_IP_PORT}`);

process.on('SIGINT', function() {
  // To make Ctrl+C work in Docker.
  process.exit();
});

if (!host.match(/^[\.0-9]+$/)) {
  dns.lookup(host, function(err, result) {
    if (err) {
      console.error(`Could not resolve host to IP: ${host}`);
      process.exit(1);
    }

    console.info(`Resolved IP to ${result}`);
    withIp(result);
  });
} else {
  // The host is already an IP.
  withIp(host);
}

function withIp(ip) {
  console.info(`Started the proxy server to ${ip}:${port}`);
  // Start the simpleproxy server.
  const proxyServer = child_process.spawn('simpleproxy', ['-L', localPort, '-R', `${ip}:${port}`]);

  proxyServer.stdout.on('data', function (data) {
    console.log('stdout: ' + data.toString());
  });

  proxyServer.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString());
  });

  proxyServer.on('exit', function (code) {
    console.log('child process exited with code ' + code.toString());
    process.exit(code);
  });
}
