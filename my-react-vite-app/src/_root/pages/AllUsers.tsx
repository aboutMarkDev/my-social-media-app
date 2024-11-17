import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { Link } from "react-router-dom";

function AllUsers() {
  const { data: users, isPending } = useGetUsers();

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="user-container">
          <h2 className="h3-bold md:h2-bold text-left w-full">Users</h2>
          {isPending ? (
            <Loader />
          ) : (
            <ul className="user-grid">
              {users?.documents.map((user) => (
                <li
                  key={user.$id}
                  className="border flex flex-col items-center py-8 rounded-[20px] border-dark-4 gap-4"
                >
                  <Link to={`/profile/${user.$id}`}>
                    <img
                      src={user.imageURL}
                      alt={user.name}
                      width={56}
                      height={56}
                      className="rounded-full"
                    />
                  </Link>
                  <div className="flex flex-col items-center gap-1">
                    <Link to={`/profile/${user.$id}`}>
                      <h2 className="base-regular md:base-medium">
                        {user.name}
                      </h2>
                    </Link>
                    <p className="small-regular text-light-3">
                      @{user.username}
                    </p>
                  </div>
                  <Button className="shad-button_primary px-5">Follow</Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
