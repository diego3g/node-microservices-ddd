import grpc from 'grpc';

import { IUsersServer, UsersService } from '@protos/generated/atlas_grpc_pb';
import { UserList, User } from '@protos/generated/atlas_pb';
import createImplementation from '../../utils/createImplementation';

const server = new grpc.Server();

const UserServiceImpl: IUsersServer = {
  getUsers: createImplementation(() => {
    const userList = new UserList();

    const user = new User();

    user.setId('user-id');
    user.setName('asd');
    user.setEmail('asd@das.com');

    userList.addUsers(user);

    return userList;
  }),
};

server.addService<IUsersServer>(UsersService, UserServiceImpl);

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
server.start();
