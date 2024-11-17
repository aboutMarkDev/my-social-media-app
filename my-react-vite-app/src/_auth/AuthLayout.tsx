import { Outlet, Navigate } from "react-router-dom";

function AuthLayout() {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <img
            src="/assets/images/NAPIC.jpg"
            alt="logo"
            // If there is appropriate logo just add object-cover w-1/2
            className="hidden xl:block h-screen object-contain bg-no-repeat"
          />
        </>
      )}
    </>
  );
}

export default AuthLayout;
