import Nav from "./Nav";
const Header = () => {
  return (
    <div className="text-light  sticky mb-8 flex w-full flex-row items-center bg-secondary px-8 py-2">
      <a className="hover:text-greeny text-xl" href="/">
        AnonSubmit
      </a>
      <Nav />
    </div>
  );
};

export default Header;
