import React, { useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import Sidebar from '../Component/Sidebar';
import RecipeList from '../Component/RecipeList';

const Home = () => {
  const categories = ['Category 1', 'Category 2', 'Category 3'];
  const chefs = ['Chef A', 'Chef B', 'Chef C'];

  const getRecipes = [
    {
      id: 1,
      title: 'Recipe A',
      description: 'desc A',
      categories: ['Category 1'],
      chef: 'Chef A',
      image: '/assets/no-image-icon.png',
    },
    {
      id: 2,
      title: 'Recipe B',
      description: 'desc A',
      categories: ['Category 2'],
      chef: 'Chef B',
      image: '/assets/no-image-icon.png',
    },
    {
      id: 3,
      title: 'Recipe C',
      description: 'desc A',
      categories: ['Category 1', 'Category 3'],
      chef: 'Chef A',
      image: '/assets/no-image-icon.png',
    },
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedChef, setSelectedChef] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(getRecipes);

  // -- Auto-apply filter --
  // useEffect(() => {
  //   handleApplyFilter();
  // }, [selectedCategories, selectedChef]);

  const handleApplyFilter = () => {
    const filtered = getRecipes.filter((recipe) => {
      let filteredCategory = true;
      if (selectedCategories.length > 0) {
        filteredCategory = recipe.categories.some((category) => {
          return selectedCategories.includes(category);
        });
      }

      let filteredChef = true;
      if (selectedChef.length > 0) {
        filteredChef = selectedChef.includes(c);
      }
      return filteredCategory && filteredChef;
    });
    setFilteredRecipes(filtered);
  };

  return (
    <>
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex w-full h-screen p-8 bg-gray-200 gap-5">
        <div className="w-1/4 bg-white rounded-2xl ">
          <Sidebar
            categories={categories}
            chefs={chefs}
            selectedCategories={selectedCategories}
            selectedChef={selectedChef}
            setSelectedCategories={setSelectedCategories}
            setSelectedChef={setSelectedChef}
            onApplyFilter={handleApplyFilter}
          />
        </div>
        <div className="w-3/4">
          <RecipeList recipes={filteredRecipes} />
        </div>
      </div>
    </>
  );
};

export default Home;
