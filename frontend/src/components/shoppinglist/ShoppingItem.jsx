const ShoppingItem = ({ item }) => {
  let icon = item.icon;
  let image = `https://wow.zamimg.com/images/wow/icons/tiny/${icon}.gif`;
  let link = item.link;

  return (
    <div className="flex items-center">
      <div>x{item.requiredAmount}</div>
      <div>
        <img src={image}></img>
      </div>
      <div>
        <a className="wowhead-link" href={link}>
          {item.name}
        </a>
      </div>
    </div>
  );
};

export default ShoppingItem;
