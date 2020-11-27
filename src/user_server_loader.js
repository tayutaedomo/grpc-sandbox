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

// ユーザー情報の読み込み
const users = require('./users.json');

// 「get」プロシージャを実装する
function get(call, callback) {
  // リクエストの「id」プロパティを取得
  const userId = call.request.id;
  const user = users[userId];

  if (!user) {
    // 該当するユーザーが存在しないのでエラーを返す
    const response = { error: true, message: "not found" };
    callback(null, response);
    return;
  }

  // 戻り値として返すUserオブジェクトを作成する
  // このとき、自動的にlowerCamelCaseからsnake_caseへの
  // プロパティ名の変換が行われる点を考慮する必要がある
  const response = { error: false,
                     user: { id: user.id,
                             nickname: user.nickname,
                             mailAddress: user.mail_address,
                             userType: user.user_type },
                   };
  callback(null, response);
}

function main() {
  // Serverオブジェクトを作成する
  const server = new grpc.Server();
  // Serverオブジェクトに定義したServicerクラスを登録する
  server.addService(proto.UserManager.service, {get: get});

  // 1234番ポートで待ち受けするよう指定する
  server.bind('0.0.0.0:1234', grpc.ServerCredentials.createInsecure());
  // 待ち受けを開始する
  server.start();
}


main();
