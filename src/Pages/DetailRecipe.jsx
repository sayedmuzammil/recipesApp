import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import supabase from '../supabase';
import Navbar from '../Component/Navbar';
import { useState } from 'react';

const fetchRecipeDetail = async (id) => {
  const res = await fetch(
    'https://fcowzvzoezqwftypdhcd.supabase.co/rest/v1/rpc/get_recipe_detail',
    {
      method: 'POST',
      headers: {
        apikey: supabase.supabaseKey,
        authorization: `Bearer ${supabase.supabaseKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipe_uuid: id }),
    }
  );

  const data = await res.json();
  console.log('Data: ', data);

  if (!res.ok) throw new Error('Failed to fetch recipe detail');
  return data;
};

const DetailRecipe = () => {
  const { id } = useParams();
  const displayName = localStorage.getItem('username');

  const {
    data: detailRecipe,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['recipe-detail', id],
    queryFn: () => fetchRecipeDetail(id),
  });

  if (isLoading) return <p>Loading recipe...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const {
    title = '',
    image = '',
    description = '',
    chef = '',
    categories = [],
    steps = [],
    ingredients = [],
  } = detailRecipe;

  return (
    <>
      <div className="w-full">
        <Navbar displayName={displayName} />
      </div>
      <div>
        <div className="w-full flex justify-center mt-10">
          <div className="flex w-1/2">
            <div className="pl-[30%]"></div>
            <div className="content-center justify-center">
              <p className=" text-3xl font-bold">
                {detailRecipe.name}
              </p>
              <div className="flex flex-wrap w-full gap-2 justify-start items-start mt-2">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 text-sm rounded-2xl text-center justify-center px-2 py-1 "
                  >
                    {/* categories */}
                    {category}
                  </div>
                ))}
              </div>
              <div className="mt-1 font-semibold">
                <p>Chef : {chef}</p>
              </div>
              <p className="mt-2 text-gray-500 text-sm">
                {description}
              </p>
            </div>
          </div>
          <div className="w-1/2 flex justify-center">
            <img
              src={image}
              alt={title}
              className="h-full max-w-md object-cover rounded-xl "
            />
          </div>
        </div>
        <div className="border-b border-gray-500 mt-8"></div>
        <div className="flex w-full p-8 bg-gray-200 gap-5">
          <div className="w-1/4 bg-white rounded-2xl outline-1 p-8">
            <div>
              <h2 className="font-semibold text-lg mb-2">
                Ingredients:
              </h2>
              <ul className="ml-5">
                {ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 mb-1"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={false}
                      id={`ingredient-${index}`}
                    />
                    <label htmlFor={`ingredient-${index}`}>
                      {ingredient.name} - {ingredient.quantity}
                      {ingredient.unit}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-3/4 bg-white rounded-2xl outline-1 p-8">
            <div>
              <h2 className="font-semibold text-lg mb-2">
                Instructions:
              </h2>
              <ol className="list-decimal ml-5">
                {steps.map((step) => (
                  <li>
                    Step {step.step_number}: {step.instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailRecipe;
