import * as functions from "firebase-functions";
import * as cors from "cors";
import getAllViewers from "./getAllViewers";
import getMyStories from "./getMyStories";
import getViewer from "./getViewer";

const corsHandler = cors({ origin: true });

interface ViewerInput {
  username: string;
  password: string;
  index: number;
}

interface StoriesInput {
  username: string;
  password: string;
}

interface ViewerByIdInput {
  username: string;
  password: string;
  id: string;
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
    const input: ViewerInput = request.body;

    try {
      const result = await getAllViewers(
        input.username,
        input.password,
        input.index
      );
      return response.send(result);
    } catch (err) {
      return response.status(500).send({ message: err.toString() });
    }
  });
});

export const stories = functions.https.onRequest(async (request, response) => {
  return corsHandler(request, response, async () => {
    const input: StoriesInput = request.body;

    try {
      const result = await getMyStories(input.username, input.password);
      return response.send(result);
    } catch (err) {
      return response.status(500).send({ message: err.toString() });
    }
  });
});

export const viewersById = functions.https.onRequest(
  async (request, response) => {
    return corsHandler(request, response, async () => {
      const input: ViewerByIdInput = request.body;

      try {
        const result = await getViewer(
          input.username,
          input.password,
          input.id
        );
        return response.send(result);
      } catch (err) {
        return response.status(500).send({ message: err.toString() });
      }
    });
  }
);
