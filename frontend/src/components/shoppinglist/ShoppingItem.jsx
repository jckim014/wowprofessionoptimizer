const ShoppingItem = ({ item }) => {
  let icon = item.icon;
  let image = `https://wow.zamimg.com/images/wow/icons/tiny/${icon}.gif`;
  let link = item.link;

  return (
    <div className="flex items-center w-1/4 pb-1">
      <div className="w-10">x{item.requiredAmount}</div>
      <div>
        <img src={image}></img>
      </div>
      <div>
        <a className="wowhead-link pl-1" href={link}>
          {item.name}
        </a>
      </div>
    </div>
    // <div className="flex items-center justify-between w-1/4 pb-1">
    //   <div className="flex flex-rows">
    //     <img className="self-center" src={image}></img>
    //     <a className="wowhead-link pl-1" href={link}>
    //       {item.name}
    //     </a>
    //   </div>
    //   <div className="">x{item.requiredAmount}</div>
    // </div>
  );
};

export default ShoppingItem;
