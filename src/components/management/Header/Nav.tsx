import AuthenticatedNav from "./AuthenticatedNav";
import UnauthenticatedNav from "./UnauthenticatedNav";

const Nav = () => {
  return (
    <>
      <UnauthenticatedNav />
      <AuthenticatedNav />
    </>
  );
};

export default Nav;
