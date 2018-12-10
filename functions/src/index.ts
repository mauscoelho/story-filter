import * as functions from "firebase-functions";
import getAllViewers from "./getAllViewers";

const cors = require("cors")({ origin: true });

interface Auth {
  username: string;
  password: string;
  index: number;
}

export const helloWorld = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    if (request.method !== "POST") {
      return response.status(401).json({
        message: "Not allowed"
      });
    }

    const auth: Auth = request.body;

    const result = await getAllViewers(
      auth.username,
      auth.password,
      auth.index
    );

    return response.send(result);
  });
});
