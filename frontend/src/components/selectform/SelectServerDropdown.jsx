import ProfessionListItem from "./ProfessionListItem";
import ServerListItem from "./ServerListItem";

const SelectServerDropdown = ({ updateServer, closeDropdown }) => {
  const serverList = [
    "Arugal",
    "Ashkandi",
    "Atiesh",
    "Auberdine",
    "Benediction",
    "Bloodsail Buccaneers",
    "Earthshaker",
    "Everlook",
    "Faerlina",
    "Firemaw",
    "Flamegor",
    "Gehennas",
    "Golemagg",
    "Grobbulus",
    "Lakeshire",
    "Mandokir",
    "Mankrik",
    "Mirage Raceway",
    "Mograine",
    "Nethergarde Keep",
    "Old Blanchy",
    "Pagle",
    "Pyrewood Village",
    "Razorfen",
    "Remulos",
    "Sulfuron",
    "Venoxis",
    "Westfall",
    "Whitemane",
    "Windseeker",
  ];
  return (
    <ul className="absolute w-full bg-white z-20 mt-1 border border-color rounded-md h-80 overflow-y-auto">
      {serverList.map((server, index) => (
        <ServerListItem
          key={index}
          server={server}
          updateServer={updateServer}
          closeDropdown={closeDropdown}
        />
      ))}
    </ul>
  );
};

export default SelectServerDropdown;
