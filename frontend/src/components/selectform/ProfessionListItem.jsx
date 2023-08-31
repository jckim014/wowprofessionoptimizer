import useRowToggle from "../../customhooks/useRowToggle";

const ProfessionListItem = ({
  profession,
  updateProfession,
  closeDropdown,
}) => {
  let icon;

  switch (profession) {
    case "Engineering":
      icon =
        "https://wow.zamimg.com/images/wow/icons/tiny/trade_engineering.gif";
      break;
    case "Alchemy":
      icon = "https://wow.zamimg.com/images/wow/icons/tiny/trade_alchemy.gif";
      break;
    case "Blacksmithing":
      icon =
        "https://wow.zamimg.com/images/wow/icons/tiny/trade_blacksmithing.gif";
      break;
    case "Cooking":
      icon =
        "https://wow.zamimg.com/images/wow/icons/tiny/inv_misc_food_15.gif";
      break;
    case "Enchanting":
      icon = "https://wow.zamimg.com/images/wow/icons/tiny/trade_engraving.gif";
      break;
    case "First Aid":
      icon =
        "https://wow.zamimg.com/images/wow/icons/tiny/spell_holy_sealofsacrifice.gif";
      break;
    case "Inscription":
      icon =
        "https://wow.zamimg.com/images/wow/icons/tiny/inv_inscription_tradeskill01.gif";
      break;
    case "Jewelcrafting":
      icon = "https://wow.zamimg.com/images/wow/icons/tiny/inv_misc_gem_01.gif";
      break;
    case "Leatherworking":
      icon =
        "https://wow.zamimg.com/images/wow/icons/tiny/inv_misc_armorkit_17.gif";
      break;
    case "Tailoring":
      icon = "https://wow.zamimg.com/images/wow/icons/tiny/trade_tailoring.gif";
      break;
  }
  return (
    <li
      className="flex hover cursor-pointer select-none relative py-2 pl-3 pr-9 border-b border-color"
      value={{ profession }}
      onClick={() => {
        updateProfession(profession);
        closeDropdown();
      }}
    >
      <img className="object-none pr-1" src={icon}></img>
      <span>{profession}</span>
    </li>
  );
};

export default ProfessionListItem;
