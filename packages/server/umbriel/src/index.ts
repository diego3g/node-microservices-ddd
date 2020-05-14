import grpc from 'grpc';

import { AuthClient } from '@protos/generated/atlas_grpc_pb';
import { AuthPayload } from '@protos/generated/atlas_pb';

const authClient = new AuthClient(
  '127.0.0.1:50051',
  grpc.credentials.combineChannelCredentials(grpc.credentials.createInsecure())
);

const payload = new AuthPayload();

payload.setEmail('diego@example.com.br');
payload.setEmail('123456');

authClient.authenticate(payload, (err, result) => {
  console.log('Token generated: ', result.getToken());
});
