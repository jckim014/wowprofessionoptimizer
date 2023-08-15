const useConvert = (total) => {
  let gold = 0;
  let silver = 0;
  let copper = 0;

  // Calculate gold
  gold = Math.floor(total / 10000);
  let remainder = total % 10000;
  // Calculate silver
  silver = Math.floor(remainder / 100);
  remainder = remainder % 100;
  // Calculate copper
  copper = remainder;

  return { gold: gold, silver: silver, copper: copper };
};

export default useConvert;
