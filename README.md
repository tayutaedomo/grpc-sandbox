# grpc-sandbox
My gRPC trial codes


## Setup
```
$ git clone git@github.com:tayutaedomo/grpc-sandbox
$ cd grpc-sandbox
$ npm install
```


## protoc
```
$ npx grpc_tools_node_protoc -I ./src/protos/ --js_out=import_style=commonjs,binary:./src --grpc_out=./src ./src/protos/user.proto
```


## Exec
### Server
```
$ node src/user_server.js
```

### Client
```
$ node src/user_client.js 0
$ node src/user_client.js 1
```
