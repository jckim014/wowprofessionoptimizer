import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestForm = () => {
  const [profession, setProfession] = useState("Engineering");
  const [server, setServer] = useState("Benediction");
  const [faction, setFaction] = useState("Alliance");

  const navigate = useNavigate();
  const data = { profession: profession, server: server, faction: faction };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/optimal-path", {
      state: data,
    });
  };
  return (
    <form className="requestOptimalPath" onSubmit={handleSubmit}>
      <h3>Calculate the cheapest way to level a profession!</h3>
      {/* add something for secondary professions later */}

      <label>Profession</label>
      <select
        name="profession"
        id="profession"
        onChange={(e) => setProfession(e.target.value)}
        defaultValue={profession}
      >
        <option value="Alchemy">Alchemy</option>
        <option value="Blacksmithing">Blacksmithing</option>
        <option value="Enchanting">Enchanting</option>
        <option value="Engineering">Engineering</option>
        <option value="Inscription">Inscription</option>
        <option value="Jewelcrafting">Jewelcrafting</option>
        <option value="Leatherworking">Leatherworking</option>
        <option value="Tailoring">Tailoring</option>
        <option value="Alchemy">Alchemy</option>
      </select>

      {/* figure out a way to populate dozens of servers */}
      {/* https://bobbyhadz.com/blog/react-warning-use-the-defaultvalue-or-value-props-on-select */}
      <label>Server</label>
      <select
        name="server"
        id="server"
        onChange={(e) => setServer(e.target.value)}
        defaultValue={server}
      >
        <option value="benediction">Benediction</option>
      </select>

      <label>Faction</label>
      <select
        name="faction"
        id="faction"
        onChange={(e) => setFaction(e.target.value)}
        defaultValue={faction}
      >
        <option value="Alliance">Alliance</option>
        <option value="Horde">Horde</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RequestForm;
