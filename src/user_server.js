/*
 * Reference: https://knowledge.sakura.ad.jp/24059/
 */

// モジュールの読み込み
const grpc = require('grpc');
const messages = require('./user_pb');
const services = require('./user_grpc_pb');

// ユーザー情報の読み込み
const users = require('./users.json');

// 「get」プロシージャを実装する
function get(call, callback) {
  // リクエストの「id」プロパティを取得
  const userId = call.request.getId();
  const user = users[userId];

  if (!user) {
    // 該当するユーザーが存在しないのでエラーを返す
    const response = new messages.UserResponse();
    response.setError(true);
    response.setMessage("not found");
    callback(null, response);
    return;
  }

  // 戻り値として返すUserオブジェクトを作成する
  const target = new messages.User();
  target.setId(user.id);
  target.setNickname(user.nickname);
  target.setMailAddress(user.mail_address);
  target.setUserType(messages.User.UserType[user.user_type]);

  // UserResponseオブジェクトを作成する
  const response = new messages.UserResponse();
  response.setError(false);
  response.setUser(target);

  // UserResponseオブジェクトを返す
  callback(null, response);
}

function main() {
  // Serverオブジェクトを作成する
  const server = new grpc.Server();
  // Serverオブジェクトに定義したServicerクラスを登録する
  server.addService(services.UserManagerService, { get: get });

  // 1234番ポートで待ち受けするよう指定する
  server.bind('0.0.0.0:1234', grpc.ServerCredentials.createInsecure());

  // 待ち受けを開始する
  server.start();
}

main();
