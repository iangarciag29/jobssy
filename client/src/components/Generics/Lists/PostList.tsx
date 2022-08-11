import { useNavigate } from "react-router-dom";
import { ClockIcon } from "@heroicons/react/outline";
import * as timeago from "timeago.js";
import { Tooltip } from "flowbite-react";

const PostList = ({ posts }: any): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {posts.map((post: any) => (
        <div
          key={post.id}
          className="relative rounded-xl bg-white px-10 py-5 shadow hover:cursor-pointer"
          onClick={() => navigate(`/app/listings/${post.id}`)}
        >
          <h4 className="text-lg font-semibold uppercase">{post.title}</h4>
          <div className="flex flex-col">
            <p>
              By{" "}
              <span className="text-jobssy-blue">
                {post.user.first_name} {post.user.last_name}
              </span>
            </p>
            <p className="inline-flex text-sm text-gray-600">
              <span>
                <Tooltip content={post.created_at}>
                  <ClockIcon className="mr-1 mt-1 h-3 w-3" />
                </Tooltip>
              </span>
              Posted {timeago.format(post.created_at)}
            </p>
          </div>
          <p className="mt-5 text-justify">{post.description}</p>
          <hr className="my-5" />
          <p className="text-xs uppercase">
            This post has received {post.bids.length} bid(s).
          </p>
          <span className="absolute top-5 right-5 mr-2 rounded bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900">
            {post.category.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PostList;
