import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeletePost,
  useGetPostById,
} from "@/lib/react-query/queriesAndMutations";
import { formatDate } from "@/lib/utils";
import { MdLocationPin } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";

function PostDetails() {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { mutateAsync: deletePost } = useDeletePost();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleDeletePost = () => {
    deletePost({ postId: id || "", imageID: post?.imageID });
    navigate(-1);
  };

  return (
    <div className="post_details-container">
      <div className="w-full max-w-5xl">
        <Button
          onClick={() => navigate(-1)}
          className="hover:-translate-x-3 transition duration-200 delay-75"
        >
          <img
            src="/assets/icons/back-button.svg"
            alt="back"
            width={35}
            height={35}
          />
        </Button>
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageURL} alt="post" className="post_details-img" />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={post?.creator?.imageURL}
                  alt="creator"
                  className="rounded-full w-10 h-10 lg:w-12 lg:h-12"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {formatDate(post?.$createdAt)}
                    </p>
                    •
                    <p className="subtle-semibold lg:small-regular flex items-center">
                      <MdLocationPin />
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center">
                <Link to={`/update-post/${post?.$id}`}>
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    className={`${user.id !== post?.creator.$id && "hidden"}`}
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`${
                    user.id !== post?.creator.$id &&
                    "hidden ghost_details-delete_btn"
                  } `}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/60" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p className="text-pretty">{post?.caption}</p>
              <ul className="flex gap-1 mt-2 flex-wrap">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    <p>#{tag}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
