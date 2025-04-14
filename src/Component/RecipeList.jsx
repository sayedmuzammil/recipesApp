import React from 'react';

const RecipeList = ({ recipes = [] }) => {
  console.log(recipes);

  return (
    <div className="w-full grid grid-cols-4 gap-5">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="w-full h-100 bg-white rounded-2xl p-5  "
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
            <div className="py-3 text-center">
              {/* recipe title */}
              <h3>{recipe.title}</h3>
            </div>
            <div className="text-center">
              {/* recipe short description */}
              {recipe.description}
            </div>
            <div className="flex flex-wrap w-full gap-2 justify-center mt-2">
              {recipe.categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-sky-200 rounded-2xl text-center justify-center px-2 py-1 "
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
