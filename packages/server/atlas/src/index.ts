import grpc from 'grpc';

import { IAuthServer, AuthService } from '@protos/generated/atlas_grpc_pb';
import { AuthPayload, AuthResult } from '@protos/generated/atlas_pb';

const server = new grpc.Server();

const AuthServiceImpl: IAuthServer = {
  authenticate(
    call: grpc.ServerUnaryCall<AuthPayload>,
    callback: grpc.sendUnaryData<AuthResult>
  ): void {
    const result = new AuthResult();

    result.setToken('asdas');

    callback(null, result);
  },
};

server.addService<IAuthServer>(AuthService, AuthServiceImpl);

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
server.start();

console.log('🕵  Atlas service running!');
