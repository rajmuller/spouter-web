import { Box } from "@chakra-ui/core";

import { PostsDocument, usePostsQuery } from "../graphql/generated";
import { initializeApollo } from "../graphql/createApollo";

const Index = () => {
  const { data } = usePostsQuery();
  return (
    <>
      <div>hello next</div>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((post) => <Box key={post.id}>{post.title}</Box>)
      )}
    </>
  );
};

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: PostsDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default Index;
