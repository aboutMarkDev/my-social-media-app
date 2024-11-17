import Footer from "@/components/shared/Footer";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { Link } from "react-router-dom";

function Saved() {
  const { user } = useUserContext();
  const { data: userData, isPending: isSavedLoading } = useGetUserById(user.id);

  return (
    <div className="flex flex-1">
      <div className="saved-container">
        <div className="max-w-5xl flex-start flex-col gap-1 justify-start w-full">
          <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
          <div className="w-full mt-10">
            {isSavedLoading ? (
              <Loader />
            ) : userData?.save.length < 1 ? (
              <div className="py-10 flex flex-col items-center gap-2">
                <img
                  src="/assets/icons/save.svg"
                  alt=""
                  className="invert-white opacity-50"
                  width={50}
                  height={50}
                />
                <h1 className="text-3xl opacity-50">Save</h1>
                <p className="line-clamp-3 w-[50%] text-center text-pretty opacity-25">
                  It seems you don't have any save posts. Save photos that you
                  want to see again. Don't worry only you can see what you've
                  saved.
                </p>
              </div>
            ) : (
              <ul className="grid-container">
                {userData?.save.map((item: Models.Document) => (
                  <li
                    key={item.$id}
                    className="flex flex-col items-center overflow-hidden rounded-[20px] gap-4 relative min-w-80 h-80 cursor-pointer"
                  >
                    <Link
                      to={`/posts/${item.post.$id}`}
                      className="grid-post_link"
                    >
                      <img
                        src={item.post.imageURL}
                        alt={item.post.caption}
                        className="h-full w-full object-cover hover:scale-110 transition duration-300 delay-75"
                      />
                    </Link>

                    <div className="grid-post_user">
                      <div className="flex items-center justify-start gap-2 flex-1">
                        <p className="max-h-12 text-ellipsis line-clamp-2">
                          {item.post.caption}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <hr className="border max-w-5xl w-full border-dark-4" />
        <Footer />
        {/* <div className="max-w-5xl flex-start gap-1 justify-start w-full border"></div> */}
      </div>
    </div>
  );
}

export default Saved;
