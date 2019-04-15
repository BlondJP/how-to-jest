async function verifyJwt({fs, path, jwt}, authorization)
{
  // console.log(typeof fs, typeof path,typeof jwt,typeof authorization)
  console.log('authorization', authorization)

  const splits = authorization.split(' ')
  const token = splits[1]

  if (!token) {
      throw new Error('Jwt not Found')
  }
  const publicKeyPath = path.basename('public.key')
  const publicKey = fs.readFileSync(publicKeyPath)

  const payload = await jwt.verify(token, publicKey)
  const uuid = payload['sub']

  if (!uuid) {
      throw new Error('Jwt is not valid');
  }

  return uuid;
}


module.exports = verifyJwt;

// const publicKeyPath = path.basename('public.key');
// const publicKey = fs.readFileSync(publicKeyPath);
// const authorization = 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NDJkYTA5Ni01YzVjLTQyMjYtYjhmZi01OTAyN2VhOGVhYWEiLCJpYXQiOjE1NTA5NTk1MTN9.SCvvKHcaRwsGI55n_-xOKbzXJb9vPNP_p0PAUXB-LK5EYK2Rz5FaXKenRb6KPBgo0inQDXtoGrONlmQ5w0Cq7wisYoDErbLecdvFhaUyatusaDaQkhcchXFePGsRRpafsYPyq4vPst0vfqF81MiaS4S0t8xT_7euEzKFsggR3tw';

//console.log(publicKey, authorization)
// (async function () {
  // const uuid = await verifyJwt(authorization, publicKey);
  // console.log(uuid)
// })();
