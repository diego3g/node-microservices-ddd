import { IUsersServer } from '@protos/atlas_grpc_pb';
import { ServerUnaryCall, sendUnaryData } from 'grpc';
import { Empty, UserList, User } from '@protos/atlas_pb';

class UserServiceImplementation implements IUsersServer {
  getUsers(
    request: ServerUnaryCall<Empty>,
    sendData: sendUnaryData<UserList>
  ): void {
    const userList = new UserList();

    const user = new User();

    user.setId('user-id');
    user.setName('asdsss');
    user.setEmail('asd@das.com');

    userList.addUsers(user);

    sendData(null, userList);
  }
}

export default UserServiceImplementation;
