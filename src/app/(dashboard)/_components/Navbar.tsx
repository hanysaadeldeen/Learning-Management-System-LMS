import MobileSideBar from "./Mobile-Side-bar";

const Navbar = () => {
  return (
    <div className="inset-y-0 z-50  p-6 fixed h-[80px] w-full border-b">
      <MobileSideBar />
    </div>
  );
};

export default Navbar;
