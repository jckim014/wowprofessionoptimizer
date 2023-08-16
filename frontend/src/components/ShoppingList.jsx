import useConvert from "../customhooks/useConvert";

const ShoppingList = (totalCost) => {
  const readableCost = useConvert(totalCost.totalCost);
  return (
    <div className="">
      <div className="">
        <p>
          <span className="font-bold">Total Cost: </span>
          {readableCost.gold.toLocaleString("en-us")} gold,{" "}
          {readableCost.silver.toLocaleString("en-us")} silver, and{" "}
          {readableCost.copper.toLocaleString("en-us")} copper.
        </p>
      </div>
      <div>
        Need to add actual shopping list. Lorem Ipsum is simply dummy text of
        the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown
        printer took a galley of type and scrambled it to make a type specimen
        book. It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was
        popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software
        like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
    </div>
  );
};

export default ShoppingList;
