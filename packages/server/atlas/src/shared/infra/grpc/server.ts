import grpc from 'grpc';

import { IUsersServer, UsersService } from '@protos/atlas_grpc_pb';
import UserServiceImplementation from '../../../modules/users/infra/grpc/implementations/UserServiceImplementation';

const server = new grpc.Server();

const UserServiceImpl = new UserServiceImplementation();

server.addService<IUsersServer>(UsersService, UserServiceImpl);

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
server.start();
