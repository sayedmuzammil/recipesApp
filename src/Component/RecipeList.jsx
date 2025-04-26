import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeList = ({ recipes = [] }) => {
  console.log(recipes);
  const navigate = useNavigate();

  const handleRecipeClick = (recipe) => {
    navigate(`/detail/${recipe.id}`, { state: recipe });
  };

  return (
    <div className="w-full grid grid-cols-4 gap-5">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="w-full h-100 bg-white rounded-2xl p-5"
            onClick={() => handleRecipeClick(recipe)}
          >
            {/* card background */}
            <div className=" bg-gray-200 rounded-2xl p-5 h-50">
              {/* image */}
              <img
                src={recipe.image}
                alt="recipe"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="items-center pt-3 text-center justify-center h-20 border-b-1 border-gray-300">
              {/* recipe title */}
              <p className="text-2xl font-extrabold">
                {recipe.title}
              </p>
            </div>

            <div className="text-center mt-2 text-gray-600">
              {/* recipe short description */}
              {recipe.description}
            </div>
            <div className="flex flex-wrap w-full gap-2 justify-center mt-2">
              {recipe?.categories?.map((category, index) => (
                <div
                  key={index}
                  className="bg-sky-200 rounded-2xl text-center justify-center px-2 py-1 text-sm "
                >
                  {/* categories */}
                  {category}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Sorry, no recipe is found.</p>
      )}
    </div>
  );
};

export default RecipeList;
