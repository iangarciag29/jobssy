import { useNavigate } from "react-router-dom";

const PostList = ({ posts }: any): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {posts.map((post: any) => (
        <div
          key={post.id}
          className="rounded-xl bg-white p-10 shadow hover:cursor-pointer"
          onClick={() => navigate(`/app/listings/${post.id}`)}
        >
          <h4 className="text-lg font-semibold">{post.title}</h4>
          {post.description}
        </div>
      ))}
    </div>
  );
};

export default PostList;
