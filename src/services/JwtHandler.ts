export default class JwtHandler {
  private fs;
  private path;
  private jwt;

  public constructor(fs: any, path: any, jwt: any) {
    this.fs = fs;
    this.path = path;
    this.jwt = jwt;
  }

  public async verify(authorization: string): Promise<String> {
    const splits = authorization.split(" ");
    const token = splits[1];

    if (!token) {
      throw new Error("Jwt not Found");
    }
    const publicKeyPath = this.path.basename("public.key");
    const publicKey = this.fs.readFileSync(publicKeyPath);

    const payload = await this.jwt.verify(token, publicKey);
    const uuid = payload["sub"];

    if (!uuid) {
      throw new Error("Jwt is not valid");
    }

    return uuid;
  }
}
