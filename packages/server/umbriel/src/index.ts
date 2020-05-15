import grpc from 'grpc';

import { UsersClient } from '@protos/generated/atlas_grpc_pb';
import { Empty } from '@protos/generated/atlas_pb';

const usersClient = new UsersClient(
  '127.0.0.1:50051',
  grpc.credentials.createInsecure()
);

const empty = new Empty();

usersClient.getUsers(empty, (err, result) => {
  const users = result.getUsersList();

  users.forEach((user) => {
    console.log(user.getName());
  });
});
