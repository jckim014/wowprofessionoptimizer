const ProfessionListItem = ({ profession }) => {
  return (
    <li
      className="text-white bg-brand-dark hover:bg-gray-600 
      cursor-pointer select-none relative py-2 pl-3 pr-9 
      focus:bg-gray-600 focus:outline-none ring-inset focus:ring-2 
      focus:ring-brand-main focus:border-brand-main"
      value={{ profession }}
    >
      {profession}
    </li>
  );
};

export default ProfessionListItem;
