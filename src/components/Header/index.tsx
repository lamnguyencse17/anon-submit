import Nav from "./Nav";
const Header = () => {
  return (
    <div className="sticky mb-8 flex w-full flex-row items-center bg-secondary px-16 py-2 text-light">
      <a className="text-xl hover:text-greeny" href="/">
        AnonSubmit
      </a>
      <Nav />
    </div>
  );
};

export default Header;
