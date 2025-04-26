import React, { useMemo, useState } from 'react';
import Navbar from '../Component/Navbar';
import Sidebar from '../Component/Sidebar';
import RecipeList from '../Component/RecipeList';
import supabase from '../supabase';
import { useQuery } from '@tanstack/react-query';

const fetchRecipes = async () => {
  const res = await fetch(
    'https://fcowzvzoezqwftypdhcd.supabase.co/rest/v1/rpc/get_all_recipes_json',
    {
      method: 'GET',
      headers: {
        apikey: supabase.supabaseKey,
        authorization: `Bearer ${supabase.supabaseKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await res.json();
  console.log('Data: ', data);

  return data.map((recipe) => ({
    id: recipe.id,
    title: recipe.name,
    image: recipe.image || '/assets/no-image-icon.png',
    description: recipe.description,
    chef: recipe.chef_name,
    categories: recipe.category_names
      ? recipe.category_names.split(',').map((cat) => cat.trim())
      : [],
  }));
};

const Home = () => {
  // -----dummy data-----
  // const categories = ['Category 1', 'Category 2', 'Category 3'];
  // const chefs = ['Chef A', 'Chef B', 'Chef C'];

  // const getRecipes = [
  //   {
  //     id: 1,
  //     title: 'Recipe A',
  //     description: 'desc A',
  //     categories: ['Category 1'],
  //     chef: 'Chef A',
  //     image: '/assets/no-image-icon.png',
  //   },
  //   {
  //     id: 2,
  //     title: 'Recipe B',
  //     description: 'desc A',
  //     categories: ['Category 2'],
  //     chef: 'Chef B',
  //     image: '/assets/no-image-icon.png',
  //   },
  //   {
  //     id: 3,
  //     title: 'Recipe C',
  //     description: 'desc A',
  //     categories: ['Category 1', 'Category 3'],
  //     chef: 'Chef A',
  //     image: '/assets/no-image-icon.png',
  //   },
  // ];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedChef, setSelectedChef] = useState([]);

  // -- Auto-apply filter using Use Effect--
  // const [filteredRecipes, setFilteredRecipes] = useState(getRecipes);
  // useEffect(() => {
  //   handleApplyFilter();
  // }, [selectedCategories, selectedChef]);

  // const handleApplyFilter = () => {
  //   const filtered = getRecipes.filter((recipe) => {
  //     let filteredCategory = true;
  //     if (selectedCategories.length > 0) {
  //       filteredCategory = recipe.categories.some((category) => {
  //         return selectedCategories.includes(category);
  //       });
  //     }

  //     let filteredChef = true;
  //     if (selectedChef.length > 0) {
  //       filteredChef = selectedChef.includes(c);
  //     }
  //     return filteredCategory && filteredChef;
  //   });
  //   setFilteredRecipes(filtered);
  // };

  // ----- Replaced by useQuery ------
  // useEffect(() => {
  //   async function fetchRecipes() {
  //     try {
  //       const getRecipes = await fetch(
  //         'https://fcowzvzoezqwftypdhcd.supabase.co/rest/v1/rpc/get_all_recipes_json',
  //         {
  //           method: 'POST',
  //           headers: {
  //             apikey: supabase.supabaseKey,
  //             Authorization: `Bearer ${supabase.supabaseKey}`,
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );
  //       const listRecipes = await getRecipes.json();

  //       console.log('list: ', listRecipes);

  //       const recipeData = listRecipes.map((recipe) => ({
  //         id: recipe.id,
  //         title: recipe.name,
  //         image: recipe.image || '/assets/no-image-icon.png',
  //         description: recipe.description,
  //         chef: recipe.chef_name || null,
  //         categories: recipe.category_names
  //           ? recipe.category_names
  //               .split(',')
  //               .map((cat) => cat.trim())
  //           : [],
  //       }));

  //       setRecipes(recipeData);
  //       console.log(recipeData);

  //       console.log(recipes);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  //   fetchRecipes();
  // }, []);

  const {
    data: recipes = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  const categories = useMemo(() => {
    const uniqueCategories = new Set();
    for (let recipe of recipes) {
      recipe.categories.forEach((cat) => uniqueCategories.add(cat));
    }
    return [...uniqueCategories];
  }, [recipes]);

  const chefs = useMemo(() => {
    const uniqueChefs = new Set();
    for (let recipe of recipes) {
      if (recipe.chef) {
        uniqueChefs.add(recipe.chef);
      }
    }
    return [...uniqueChefs];
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        recipe.categories.some((cat) =>
          selectedCategories.includes(cat)
        );

      const matchesChef =
        selectedChef.length === 0 ||
        selectedChef.includes(recipe.chef);

      return matchesCategory && matchesChef;
    });
  }, [recipes, selectedCategories, selectedChef]);

  // save username into Local Storage
  const displayName = localStorage.getItem('username');
  console.log('DP: ', displayName);

  if (isLoading) return <div>Loading recipes... </div>;
  if (isError)
    return <div>Error loading recipes: {error.message} </div>;

  return (
    <>
      <div className="w-full">
        <Navbar displayName={displayName} />
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
            // onApplyFilter={handleApplyFilter} --> removed because not using handleApplyFilter
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
