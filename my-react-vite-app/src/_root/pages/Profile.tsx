import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import LikedPosts from "./LikedPosts";
import Loader from "@/components/shared/Loader";
import ProfileGridList from "@/components/shared/ProfileGridList";

type StatBlockProps = {
  value: string | number;
  label: string;
};

function Profile() {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const { data: userProfile, isPending: isProfileLoading } = useGetUserById(
    id || ""
  );

  const StatBlock = ({ value, label }: StatBlockProps) => (
    <div className="flex-center gap-2">
      <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
      <p className="small-medium lg:base-medium text-light-2">{label}</p>
    </div>
  );

  return (
    <>
      {isProfileLoading ? (
        <Loader />
      ) : (
        <div className="profile-container">
          <div className="profile-inner_container ">
            <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
              <img
                src={userProfile?.imageURL}
                alt="name"
                className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
              />
              <div className="flex flex-col flex-1 justify-between md:mt-2 ">
                <div className="flex flex-col w-full">
                  <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                    {userProfile?.name}
                  </h1>
                  <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                    @{userProfile?.username}
                  </p>
                </div>

                <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
                  {userProfile?.bio
                    ? userProfile?.bio
                    : user.id === userProfile?.$id && "Add bio..."}
                </p>

                <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
                  <StatBlock value={userProfile?.posts.length} label="Posts" />
                  <StatBlock value={0} label="Followers" />
                  <StatBlock value={0} label="Following" />
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <div className={`${user.id !== userProfile?.$id && "hidden"}`}>
                  <Link
                    to={`/update-profile/${userProfile?.$id}`}
                    className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                      user.id !== userProfile?.$id && "hidden"
                    }`}
                  >
                    <img
                      src={"/assets/icons/edit.svg"}
                      alt="edit"
                      width={20}
                      height={20}
                    />
                    <p className="flex whitespace-nowrap small-medium">
                      Edit Profile
                    </p>
                  </Link>
                </div>
                <div className={`${user.id === id && "hidden"}`}>
                  <Button type="button" className="shad-button_primary px-8">
                    Follow
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {userProfile?.$id === user.id && (
            <div className="flex max-w-5xl w-full justify-center">
              <Link
                to={`/profile/${id}`}
                className={`profile-tab rounded-l-lg ${
                  pathname === `/profile/${id}` && "!bg-dark-3"
                }`}
              >
                <img
                  src="/assets/icons/blog.svg"
                  alt="posts"
                  width={20}
                  height={20}
                />
                Posts
              </Link>

              <Link
                to={`/profile/${id}/liked-posts`}
                className={`profile-tab rounded-r-lg ${
                  pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
                }`}
              >
                <img
                  src={"/assets/icons/like.svg"}
                  alt="like"
                  width={20}
                  height={20}
                />
                Liked Posts
              </Link>
            </div>
          )}

          <Routes>
            <Route
              index
              element={<ProfileGridList posts={userProfile?.posts} />}
            />
            {userProfile?.$id === user.id && (
              <Route path="/liked-posts" element={<LikedPosts />} />
            )}
          </Routes>
          <Outlet />
        </div>
      )}
    </>
  );
}

export default Profile;
