import Nav from "./Nav";
const Header = () => {
  return (
    <div className="sticky mb-8 flex w-full flex-row items-center bg-secondary px-8 py-2 text-dark">
      <a className="text-xl" href="/">
        AnonSubmit
      </a>
      <Nav />
    </div>
  );
};

export default Header;
