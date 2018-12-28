# docker-simpleproxy
Docker wrapper for simpleproxy for TCP connections

## Usage

### Ports

Port 8080 of this image is exposed for proxying TCP connections.

### Env Vars

`PROXY_TO_HOST_IP_PORT`: HOST:IP to proxy TCP requests to. Host can be a hostname or IP. Examples: `google.com:1234`, `127.0.0.1:3000`.

### Examples

If you want to proxy to a host's port 3000, do:

```sh
docker run --rm --name simpleproxy -p 8080:8080 -e PROXY_TO_HOST_IP_PORT=example.com:3000 amcsi/simpleproxy 
```

If you want to proxy to your Docker host, do:

```sh
docker run --rm --name simpleproxy -p 8080:8080 -e PROXY_TO_HOST_IP_PORT=$(ip -4 addr show docker0 | grep -Po 'inet \K[\d.]+'):3000 simpleproxy
```

## LICENSE

MIT
