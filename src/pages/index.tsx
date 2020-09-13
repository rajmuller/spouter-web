import { Box } from "@chakra-ui/core";

import { usePostsQuery } from "../graphql/generated";

const Index = () => {
  const { data } = usePostsQuery();
  console.log("data: ", data);
  return (
    <>
      <div>hello next</div>
      <br />
      {!data
        ? null
        : data.posts.map((post) => <Box key={post.id}>{post.title}</Box>)}
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default Index;
