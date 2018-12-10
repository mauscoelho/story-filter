import * as Instagram from "instagram-private-api";

const createSession = async (username: string, password: string) => {
  const device = new Instagram.V1.Device(username);
  const storage = new Instagram.V1.CookieMemoryStorage();
  const session = await Instagram.V1.Session.create(
    device,
    storage,
    username,
    password
  );
  return session;
};

export default createSession;
