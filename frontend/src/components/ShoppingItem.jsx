const ShoppingItem = ({ item }) => {
  return <div className="flex">{item.name}</div>;
  // several columns, going down and spilling over into the right
  //   Name + quantity + icon?
};

export default ShoppingItem;
