function call(callMethod, payload) {
  return callMethod(payload, (err, result) => {
    if (err) {
      throw err;
    }

    return result;
  });
}

export default call;
