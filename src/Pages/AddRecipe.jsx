import React, { useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import supabase from '../supabase';
import { useQuery } from '@tanstack/react-query';

const fetchChef = async () => {
  const res = await fetch(
    'https://fcowzvzoezqwftypdhcd.supabase.co/rest/v1/rpc/get_chefs',
    {
      method: 'GET',
      headers: {
        apikey: supabase.supabaseKey,
        authorization: `Bearer ${supabase.supabaseKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const listChefs = await res.json();
  const chefs = listChefs.map((chef) => chef.name);
  console.log(chefs);
  return chefs;
};

const ChefInput = ({ value, onChange, chefs = [] }) => {
  const [userInputChef, setUserInputChef] = useState('');
  const [showSuggesstions, setShowSuggestion] = useState(false);

  const filteredChef = chefs
    .filter(
      (chef_name) =>
        userInputChef.length >= 3 &&
        chef_name.toLowerCase().includes(userInputChef.toLowerCase())
    )
    .slice(0, 2);

  const handleSelect = (chef_name) => {
    onChange(chef_name);
    setUserInputChef(chef_name);
    setShowSuggestion(false);
  };

  useEffect(() => {
    if (userInputChef != value) setUserInputChef(value);
  }, [value]);
  return (
    <div className="relative">
      <input
        type="text"
        value={userInputChef}
        placeholder="Chef Name"
        onChange={(e) => {
          setUserInputChef(e.target.value);
          setShowSuggestion(true);
          onChange(e.target.value);
        }}
        className="w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1"
      />
      {showSuggesstions && filteredChef.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
          {filteredChef.map((chef, index) => (
            <li
              key={index}
              onClick={() => handleSelect(chef)}
              className=" hover:bg-gray-100 px-3 py-2"
            >
              {chef}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AddRecipe = () => {
  const [recipeName, setRecipeName] = useState('');
  const [chef, setChef] = useState('');
  const [description, setDecription] = useState('');

  const [videoSource, setVideoSource] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [imageURL, setImageURL] = useState('');

  const displayName = localStorage.getItem('displayname');

  const {
    data: chefs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['chefs'],
    queryFn: fetchChef,
  });

  return (
    <>
      <div className="w-full">
        <Navbar displayName={displayName} />
      </div>
      <div>
        <div className="w-full text-center justify-center mt-3">
          <p className="text-2xl">Add New Recipe</p>
        </div>

        <form>
          <div className=" max-w-4xl mx-auto p-5 mt-10 ">
            <div className="flex">
              <div className={'w-full items-center gap-2 p-2 mb-3 '}>
                {/* Recipe Name */}
                <p>Recipe name</p>
                <input
                  type="text"
                  name="Recipe Name"
                  placeholder="Recipe Name"
                  required
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1"
                />
              </div>
              <div className={'w-full items-center gap-2 p-2 mb-3'}>
                {/* Chef */}
                <p>Chef</p>
                {isLoading ? (
                  <p>Loading chefs...</p>
                ) : isError ? (
                  <p>Error loading chefs: {error.message}</p>
                ) : (
                  <ChefInput
                    value={chef}
                    onChange={(value) => setChef(value)}
                    chefs={chefs}
                  />
                )}
                {/* <input
                  type="text"
                  name="Chef"
                  placeholder="Chef"
                  value={chef}
                  onChange={(e) => setChef(e.target.value)}
                  className="w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1"
                /> */}
              </div>
            </div>

            <div className={'w-full items-center gap-2 p-2 mb-3'}>
              {/* Description */}
              <p>Description</p>
              <textarea
                name="Description"
                placeholder="Description"
                rows={4}
                onChange={(e) => setDecription(e.target.value)}
                className="w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1"
              />
            </div>
            <div className="flex">
              <div className={'w-full items-center gap-2 p-2 mb-3 '}>
                {/* Recipe Name */}
                <p>Video</p>
                <div className="w-full flex gap-5">
                  <div>
                    <input
                      type="radio"
                      name="Video"
                      value="Youtube"
                      checked
                      className="mr-1"
                      onChange={(e) => setVideoSource('Youtube')}
                    />
                    <label htmlFor="Youtube">Youtube</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="Video"
                      value="Instagram"
                      checked
                      className="mr-1"
                      onChange={(e) => setVideoSource('Instagram')}
                    />
                    <label htmlFor="Instagram">Instagram</label>
                  </div>
                </div>

                <input
                  type="text"
                  name="Video"
                  placeholder="Video"
                  onChange={(e) => setVideoURL(e.target.value)}
                  className="w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1"
                />
              </div>
              <div className={'w-full items-center gap-2 p-2 mb-3'}>
                {/* Chef */}
                <p>Image</p>
                <input
                  type="text"
                  name="Image"
                  placeholder="Image"
                  onChange={(e) => setImageURL(e.target.value)}
                  className="w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1"
                />
              </div>
            </div>

            <div className={'w-full  items-center gap-2 p-2 mb-3 '}>
              {/* Ingredrients */}
              <p>Ingredrients</p>
              <div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="qty"
                    placeholder="qty"
                    required
                    className="w-1/8 rounded-md px-3 py-1.5 text-base text-gray-900 outline-1"
                  />
                  <input
                    type="text"
                    name="unit"
                    placeholder="unit"
                    required
                    className="w-1/8 rounded-md px-3 py-1.5 text-base text-gray-900 outline-1"
                  />
                  <input
                    type="text"
                    name="Ingredrients"
                    placeholder="Ingredrients"
                    required
                    className="w-6/8 rounded-md px-3 py-1.5 text-base text-gray-900 outline-1"
                  />
                </div>
                <div>
                  <input
                    type="button"
                    value={'Add Ingredrients'}
                    className="w-10% p-2 bg-[#E23E3E] hover:opacity-90 text-white rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className={'w-full  items-center gap-2 p-2 mb-3'}>
              {/* Instruction */}
              <p>Instruction</p>
              <input
                type="text"
                name="Instruction"
                placeholder="Instruction"
                required
                className="w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1"
              />
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-[#E23E3E] hover:opacity-90 text-white rounded-2xl"
            >
              {/* button login */}
              Add recipe
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRecipe;
