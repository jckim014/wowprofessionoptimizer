import { Link } from "react-router-dom";
import { GiAnvilImpact } from "react-icons/gi";

const Navbar = () => {
  return (
    <header className="fixed top-0 z-20 w-full px-4 mx-auto bg-gray-800 shadow-md sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        <div className="flex">
          <Link to="/" className="flex items-center">
            <GiAnvilImpact className="blizzard-blue text-5xl pb-3"></GiAnvilImpact>
            <p className="text-white font-bold">WOTLK Professions</p>
          </Link>
        </div>

        {/* <div className="placeholder/spacer"></div>
        <div className="flex">
          <div className="text-white">
            <FactionSelect />
          </div>
          <div className="text-white">
            <ServerSelect />
          </div>
        </div> */}
      </div>
    </header>
  );
};

export default Navbar;
