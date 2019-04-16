const verifyJwt = require("../../../src/services/verifyJwt");
const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NDJkYTA5Ni01YzVjLTQyMjYtYjhmZi01OTAyN2VhOGVhYWEiLCJpYXQiOjE1NTQyMjI1MjF9.L-8H6cm3XhaYOE7QzW2vz-lE4y3-I_9UeAX7o1zMJnj6NnBQwhAtIG5dISuh_myOQxqbaFpoKeRDwG56z79TO68AziPxDYvDa45zoQOVz6UHtSyiVUj1XbLOqFmT80BOpGAhnk276BX-gUzp8LbR3fh-_1idSgk8wuK6eDNK3kM";

const authorization = "Bearer " + token;
const expectedUuid = "420e9cff-8a72-4ed5-8e75-17b6e3bb8cb5";

const path = {
  basename: jest.fn().mockReturnValue("my-fake-path")
};

const fs = {
  readFileSync: jest.fn().mockReturnValue("my-key")
};

const jwt = {
  verify: jest.fn().mockResolvedValue({
    sub: expectedUuid
  })
};
const deps = { path, fs, jwt };

test("verification ok", async () => {
  const uuid = await verifyJwt(deps, authorization);

  expect(uuid).toBe(expectedUuid);

  expect(path.basename).toBeCalled();
  expect(fs.readFileSync).toBeCalledWith("my-fake-path");
  expect(jwt.verify).toBeCalledWith(token, "my-key");
});
