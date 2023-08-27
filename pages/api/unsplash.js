import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_KEY,
});

export default async function handler(req, res) {
  const { query, color } = JSON.parse(req.body);
  const result = await unsplash.search.getPhotos({
    query,
    // page: 2,
    perPage: 10,
    // color,
    orientation: "landscape",
  });
  //   console.log(result);
  res.send(result);
}
