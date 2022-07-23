const PostList = ({ posts }: any): JSX.Element => {
  return (
    <div className="grid gap-5">
      {posts.map((post: any) => (
        <div key={post.id} className="rounded-xl bg-white p-10 shadow">
          <h4 className="text-lg font-semibold">{post.title}</h4>
          {post.description}
        </div>
      ))}
    </div>
  );
};

export default PostList;
