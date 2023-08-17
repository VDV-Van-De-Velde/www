import React from "react";

export const Filters = ({ data }) => {
  return (
    <>
      {data.map((categoryData)=> {
        return (
            <div key={categoryData.slug} className="max-w-7xl mx-auto flex flex-wrap justify-center">
                <button className="inline-block pt-0.5 pb-1.5 px-2 rounded-md text-sm text-white subpixel-antialiased font-medium bg-gray-900 cursor-pointer" onClick={()=> handlepost(categoryData.slug)}>{categoryData.slug}</button>
            </div>
        )

      })}
    </>
  );
};

export const handlepost = ({data}) => {
  const category = encodeURIComponent(data);

};