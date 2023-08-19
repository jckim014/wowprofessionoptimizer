const ShoppingItem = ({ item }) => {
  let icon = item.icon;
  let link = `https://wow.zamimg.com/images/wow/icons/tiny/${icon}.gif`;
  return (
    <div className="flex items-center">
      <div>x{item.requiredAmount}</div>
      <div>
        <img src={link}></img>
      </div>
      <div>{item.name}</div>
    </div>
  );
};

export default ShoppingItem;
