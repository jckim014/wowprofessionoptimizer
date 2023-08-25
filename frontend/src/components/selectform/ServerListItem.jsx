import useRowToggle from "../../customhooks/useRowToggle";

const ServerListItem = ({ server, updateServer, closeDropdown }) => {
  return (
    <li
      className="hover cursor-pointer select-none relative py-2 pl-3 pr-9"
      value={{ server }}
      onClick={() => {
        updateServer(server);
        closeDropdown();
      }}
    >
      {server}
    </li>
  );
};

export default ServerListItem;
