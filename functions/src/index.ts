import * as functions from "firebase-functions";
import getAllViewers from "./getAllViewers";

interface Auth {
  username: string;
  password: string;
  index: number;
}

export const helloWorld = functions.https.onRequest(
  async (request, response) => {
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
  }
);
