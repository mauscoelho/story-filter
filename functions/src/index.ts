import * as functions from "firebase-functions";
import * as cors from "cors";
import getAllViewers from "./getAllViewers";

const corsHandler = cors({ origin: true });

interface Auth {
  username: string;
  password: string;
  index: number;
}

export const ping = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {
    response.send(
      `Ping from Firebase (with CORS handling)! ${new Date().toISOString()}`
    );
  });
});

export const viewers = functions.https.onRequest(async (request, response) => {
  return corsHandler(request, response, async () => {
    const auth: Auth = request.body;

    try {
      const result = await getAllViewers(
        auth.username,
        auth.password,
        auth.index
      );
      return response.send(result);
    } catch (err) {
      return response.status(500).send({ message: err.toString() });
    }
  });
});
