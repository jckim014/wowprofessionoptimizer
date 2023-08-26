import { Link } from "react-router-dom";
import { GiAnvilImpact } from "react-icons/gi";

const Navbar = () => {
  return (
    <header className="w-full">
      <div className="relative flex items-center justify-between p-2">
        <div className="flex">
          <Link to="/" className="flex items-center">
            <GiAnvilImpact className="text-5xl pb-1"></GiAnvilImpact>
            <p className="text-2xl font-bold pl-2">WOTLK Professions</p>
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
