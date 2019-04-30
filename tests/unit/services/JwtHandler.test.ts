const JwtHandler = require("../../../src/services/JwtHandler");
const token: string =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NDJkYTA5Ni01YzVjLTQyMjYtYjhmZi01OTAyN2VhOGVhYWEiLCJpYXQiOjE1NTQyMjI1MjF9.L-8H6cm3XhaYOE7QzW2vz-lE4y3-I_9UeAX7o1zMJnj6NnBQwhAtIG5dISuh_myOQxqbaFpoKeRDwG56z79TO68AziPxDYvDa45zoQOVz6UHtSyiVUj1XbLOqFmT80BOpGAhnk276BX-gUzp8LbR3fh-_1idSgk8wuK6eDNK3kM";

const authorization: string = "Bearer " + token;
const expectedUuid: string = "420e9cff-8a72-4ed5-8e75-17b6e3bb8cb5";

const path: any = {
  basename: jest.fn().mockReturnValue("my-fake-path")
};

const fs: any = {
  readFileSync: jest.fn().mockReturnValue("my-key")
};

const jwt: any = {
  verify: jest.fn().mockResolvedValue({
    sub: expectedUuid
  })
};

const handler = new JwtHandler(path, fs, jwt);

test("verification ok", async () => {
  const uuid = await handler.verify(authorization);

  expect(uuid).toBe(expectedUuid);

  expect(path.basename).toBeCalled();
  expect(fs.readFileSync).toBeCalledWith("my-fake-path");
  expect(jwt.verify).toBeCalledWith(token, "my-key");
});
