import { formatDate } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import { useUserContext } from "@/context/AuthContext";
import PostStats from "./PostStats";

type PostCardProps = {
  post: Models.Document;
};

function PostCard({ post }: PostCardProps) {
  const { user } = useUserContext();
  if (!post.creator) return;
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={post?.creator?.imageURL}
              alt="creator"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {formatDate(post.$createdAt)}
              </p>
              •
              <p className="subtle-semibold lg:small-regular flex items-center">
                <MdLocationPin />
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <img
            src="/assets/icons/edit.svg"
            alt="editIcon"
            width={22}
            height={22}
          />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p className="text-pretty">{post.caption}</p>
          <ul className="flex gap-1 mt-2 flex-wrap">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-light-3">
                <p>#{tag}</p>
              </li>
            ))}
          </ul>
        </div>

        <img src={post.imageURL} alt="post" className="post-card_img" />
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  );
}

export default PostCard;
