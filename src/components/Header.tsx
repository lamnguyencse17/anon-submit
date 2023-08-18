const Header = () => {
  return (
    <div className="sticky mb-8 flex w-full flex-row items-center bg-secondary px-8 py-2 text-dark">
      <a className="text-xl" href="/">
        AnonSubmit
      </a>
      <div className="flex flex-1 flex-row justify-end space-x-4">
        <a href="#">Register</a>
        <a href="#">Login</a>
      </div>
    </div>
  );
};

export default Header;
