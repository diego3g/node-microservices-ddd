import grpc, { handleUnaryCall } from 'grpc';

function createImplementation<Request, Response>(
  implementation: (call: grpc.ServerUnaryCall<Request>) => Response
): handleUnaryCall<Request, Response> {
  return (call, callback): void => {
    try {
      const result = implementation(call);

      callback(null, result);
    } catch (err) {
      callback(err, null);
    }
  };
}

export default createImplementation;
