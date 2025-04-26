import React from 'react';

const Sidebar = ({
  categories,
  chefs,
  selectedCategories,
  selectedChef,
  setSelectedCategories,
  setSelectedChef,
  // onApplyFilter,
}) => {
  const handleChefChange = (value) => {
    if (selectedChef.includes(value)) {
      setSelectedChef(selectedChef.filter((item) => item != value));
    } else {
      setSelectedChef([...selectedChef, value]);
    }
  };

  const handleCategoryChange = (value) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item != value)
      );
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const handleClearFilter = () => {
    setSelectedCategories([]);
    setSelectedChef([]);
  };

  return (
    <div className="p-5">
      <div className="border-b-1 border-gray-300 pb-3">
        <h3 className="mt-2 mb-1">Category</h3>
        <ul>
          {categories.map((value, index) => {
            return (
              <li key={index}>
                <label className="flex items-center gap-2 font-medium mb-1">
                  <input
                    type="checkbox"
                    className="form-checkbox rounded-2xl size-5"
                    checked={selectedCategories.includes(value)}
                    onChange={() => handleCategoryChange(value)}
                  />
                  <span>{value}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="border-b-1 border-gray-300 py-3">
        <h3 className="mt-2 mb-1">Chefs</h3>
        <ul>
          {chefs.map((value, index) => {
            return (
              <li key={index}>
                <label className="flex items-center gap-2 font-medium mb-1">
                  <input
                    type="checkbox"
                    className="form-checkbox rounded-2xl size-5"
                    checked={selectedChef.includes(value)}
                    onChange={() => handleChefChange(value)}
                  />
                  <span>{value}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="p-4 text-sm">
        <p>
          <strong>Selected Categories:</strong>{' '}
          {selectedCategories.join(', ')}
        </p>
        <p>
          <strong>Selected Chefs:</strong> {selectedChef.join(', ')}
        </p>
      </div>
      <div>
        {/* --- Not used because filter auto update --- */}
        {/* <button
          type="submit"
          className="w-full p-2 mt-4 bg-[#E23E3E] hover:opacity-90 text-white font-bold rounded-2xl"
           onClick={onApplyFilter}
        >
          Apply Filter
        </button> */}
        <button
          type="submit"
          className="w-full p-2 mt-4 bg-white border border-gray-300 text-black font-bold hover:opacity-90 rounded-2xl"
          onClick={handleClearFilter}
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
