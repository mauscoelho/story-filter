import * as Instagram from "instagram-private-api";
import createSession from "./createSession";
import { differenceBy } from "lodash";

const hasStories = stories => stories.length === 0;
const hasStoryIndex = (stories, storyIndex) => storyIndex >= stories.length;

const getAllViewers = async (
  username: string,
  password: string,
  storyIndex: number | 0
) => {
  const session = await createSession(username, password);
  const me = await session.getAccountId();
  const stories = await new Instagram.V1.Feed.UserStory(session, [me]).get();

  if (hasStories(stories) || hasStoryIndex(stories, storyIndex)) {
    return {
      viewersCount: 0,
      viewers: [],
      notFollowMe: [],
      notFollowMeCount: 0,
      me
    };
  }

  const storyId = stories[0]._params.items[storyIndex].id;
  const viewersCount = stories[0]._params.items[storyIndex].viewer_count;
  const viewers = await getViewers(session, storyId);
  const notFollowMe = await getViewersNotFollowMe(session, viewers, me);
  const notFollowMeCount = notFollowMe.length;

  return {
    viewersCount,
    viewers,
    notFollowMe,
    notFollowMeCount,
    me
  };
};

export default getAllViewers;

async function getViewers(session: any, storyId: any) {
  const storyViewers = await new Instagram.V1.Feed.StoryViewers(
    session,
    storyId
  );
  const allViewers = await storyViewers.all();
  const viewers = mapToViewer(allViewers);
  return viewers;
}

async function getViewersNotFollowMe(session: any, viewers: any, me: any) {
  const followersPromise = await new Instagram.V1.Feed.AccountFollowers(
    session,
    me
  );
  const myFollowers = await followersPromise.all();
  const followers = mapToViewer(myFollowers);
  const notFollowMe = differenceBy(viewers, followers, "id");

  return notFollowMe;
}

function mapToViewer(users: any) {
  return users.map(user => ({
    id: user._params.id,
    username: user._params.username,
    picture: user._params.picture
  }));
}
