// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var user_pb = require('./user_pb.js');

function serialize_UserRequest(arg) {
  if (!(arg instanceof user_pb.UserRequest)) {
    throw new Error('Expected argument of type UserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UserRequest(buffer_arg) {
  return user_pb.UserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_UserResponse(arg) {
  if (!(arg instanceof user_pb.UserResponse)) {
    throw new Error('Expected argument of type UserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UserResponse(buffer_arg) {
  return user_pb.UserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// ユーザー管理を行うサービス
var UserManagerService = exports.UserManagerService = {
  // ユーザー情報を取得する
get: {
    path: '/UserManager/get',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UserRequest,
    responseType: user_pb.UserResponse,
    requestSerialize: serialize_UserRequest,
    requestDeserialize: deserialize_UserRequest,
    responseSerialize: serialize_UserResponse,
    responseDeserialize: deserialize_UserResponse,
  },
};

exports.UserManagerClient = grpc.makeGenericClientConstructor(UserManagerService);
