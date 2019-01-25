import createSession from "./createSession";
import {
  getViewersById,
  getViewersNotFollowMe,
  mapToViewer
} from "./getAllViewers";

const getViewer = async (username: string, password: string, id: string) => {
  const session = await createSession(username, password);
  const me = await session.getAccountId();

  const allViewers = await getViewersById(session, id);
  const viewers = mapToViewer(allViewers);
  const notFollowMe = await getViewersNotFollowMe(session, viewers, me);
  const notFollowMeCount = notFollowMe.length;

  return {
    viewersCount: viewers.length,
    viewers,
    notFollowMe,
    notFollowMeCount,
    me
  };
};

export default getViewer;
