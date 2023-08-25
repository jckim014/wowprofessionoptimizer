import Switch from "@mui/material/Switch";

const SelectFactionSwitch = ({ factionState, updateFaction }) => {
  return (
    <div className="flex flex-col items-center pb-6">
      <p className="self-start text-lg font-bold pb-2">Faction</p>
      <div className="relative flex justify-center">
        <span>
          <img
            src="https://www.warcrafttavern.com/wp-content/uploads/2021/07/WoW-Alliance-Crest.png"
            className="w-10"
          ></img>
        </span>
        <Switch
          color="default"
          onChange={(e) => {
            if (factionState == "Alliance") {
              updateFaction("Horde");
            } else {
              updateFaction("Alliance");
            }
          }}
        />
        <span>
          <img
            src="https://www.warcrafttavern.com/wp-content/uploads/2021/07/WoW-Horde-Crest.png"
            className="w-10"
          ></img>
        </span>
      </div>
    </div>
  );
};

export default SelectFactionSwitch;

// import styled from "styled-components";

// const Input = styled.input`
//   position: absolute;
//   left: -9999px;
//   top: -9999px;

//   &:checked + span {
//     background-color: #1890ff;

//     &:before {
//       left: 27px;
//     }
//   }
// `;
// const Slider = styled.span`
//     display: flex;
//     cursor: pointer;
//     width: 50px;
//     height: 25px;
//     border-radius: 100px;
//     background-color: #bfbfbf;
//     position: relative;
//     transition: background-color 0.2s;

//     &:before {
//         content: "";
//         position: absolute;
//         top: 2px;
//         left: 2px
//         width: 21px;
//         height: 21px;
//         border-radius: 45px;
//         transition: 0.2s;
//         background: #ffffff;
//         box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2);
//     }
// `;
