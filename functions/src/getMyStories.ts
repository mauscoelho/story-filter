import * as Instagram from "instagram-private-api";
import createSession from "./createSession";

const getMyStories = async (username: string, password: string) => {
  const session = await createSession(username, password);
  const me = await session.getAccountId();
  const stories = await new Instagram.V1.Feed.UserStory(session, [me]).get();

  console.log(stories[0]._params.items);

  const myStories = stories[0]._params.items.map(item => ({
    id: item.id,
    count: item.total_viewer_count,
    photoPreview: item.image_versions2.candidates[0],
    photo: item.image_versions2.candidates[1]
  }));

  return myStories;
};

export default getMyStories;
