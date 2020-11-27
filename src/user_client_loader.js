/*
 * Reference: https://knowledge.sakura.ad.jp/24059/
 */

// モジュールの読み込み
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

// プロトコル定義ファイルの読み込み
const PROTO_PATH = __dirname + '/protos/user.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);

// プロトコル定義からオブジェクトのプロトタイプを構築する
const proto = grpc.loadPackageDefinition(packageDefinition);

function main() {
  // 引数をチェックする
  if (process.argv.length < 3) {
    console.log(`usage: node ${process.argv[1]} <user_id>`);
    return;
  }

  const userId = Number(process.argv[2]);
  if (isNaN(userId)) {
    console.log(`error: invalid user_id \`${process.argv[2]}'`);
    console.log(`usage: node ${process.argv[1]} <user_id>`);
    return;
  }

  // クライアントオブジェクトを作成する
  const client = new proto.UserManager(
    'localhost:1234', grpc.credentials.createInsecure());
  // リクエストを送信する
  client.get({id: userId}, function(err, response) {
    console.log(response);
  });
}


main();
