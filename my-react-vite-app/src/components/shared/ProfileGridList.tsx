import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { Link, useParams } from "react-router-dom";
import PostStats from "./PostStats";
import Footer from "./Footer";

type GridPostListProps = {
  posts: Models.Document[];
  showStats?: boolean;
};

function ProfileGridList({ posts, showStats = true }: GridPostListProps) {
  const { user } = useUserContext();
  const { id } = useParams();
  return (
    <>
      {posts.length === 0 ? (
        user.id === id ? (
          <div className="w-full flex flex-col items-center gap-1 py-5">
            <img
              src="/assets/icons/blog.svg"
              alt="post"
              className="h-16 w-16 md:h-20 md:w-20 opacity-50"
            />
            <h1 className="text-center text-primary-600/50 text-xl md:text-3xl font-extrabold">
              Post now.
            </h1>
            <p className="text-center text-xs md:text-sm opacity-50 text-primary-500">
              Post your first photo now, when you post your first photo it will
              appear in your profile and in home feed.
            </p>
            <Link
              to="/create-post"
              className="text-primary-500 hover:text-primary-600 mt-5 max-md:text-sm font-semibold"
            >
              Click here to create post
            </Link>

            <Footer />
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-1 py-5">
            <img
              src="/assets/icons/blog.svg"
              alt="post"
              className="h-16 w-16 md:h-20 md:w-20 opacity-50"
            />
            <h1 className="text-center text-primary-600/50 text-xl md:text-3xl font-extrabold">
              No posts yet
            </h1>

            <Footer />
          </div>
        )
      ) : (
        <ul className="grid-container">
          {posts?.map((post) => (
            <li key={post.$id} className="relative min-w-80 h-80">
              <Link to={`/posts/${post.$id}`} className="grid-post_link">
                <img
                  src={post.imageURL}
                  alt="post"
                  className="h-full w-full object-cover hover:scale-110 transition duration-300 delay-75"
                />
              </Link>

              <div className="grid-post_user">
                {showStats && <PostStats post={post} userId={user.id} />}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default ProfileGridList;
