import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";

function LikedPosts() {
  const { user } = useUserContext();
  const { data: userProfile, isPending: isLikedPostLoading } = useGetUserById(
    user.id
  );

  return (
    <div className="w-full max-w-5xl">
      {isLikedPostLoading ? (
        <Loader />
      ) : (
        <>
          {userProfile?.liked.length !== 0 ? (
            <GridPostList posts={userProfile?.liked} showStats={false} />
          ) : (
            <h1 className="text-center text-primary-600/70 base-semibold">
              No liked posts.
            </h1>
          )}
        </>
      )}
    </div>
  );
}

export default LikedPosts;
