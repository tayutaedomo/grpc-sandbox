/*
 * Reference: https://knowledge.sakura.ad.jp/24059/
 */

// モジュールの読み込み
const grpc = require('grpc');
const messages = require('./user_pb');
const services = require('./user_grpc_pb');

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

  // リクエストオブジェクトを作成する
  const request = new messages.UserRequest();
  request.setId(userId);

  // クライアントオブジェクトを作成する
  const client = new services.UserManagerClient(
    'localhost:1234', grpc.credentials.createInsecure());

  // リクエストを送信する
  client.get(request, function(err, response) {
    // 取得したレスポンスの表示
    console.log(response);
    console.log(response.toObject());
  });
}

main();
