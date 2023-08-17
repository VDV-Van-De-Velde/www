import React from "react";
import Link from "next/link";

export const Products = ({ data }) => {
  return (
    <>
      {data.map((postData) => {
        return (
          <div key={postData.id} className={`mb-4 grow p-0 sm:p-4 md:w-1/3 max-w-2xl`}> {/* Card container */}
            <Link
                href={postData.link}
                target="_blank">
                <img src={postData.src} alt={postData.title} />
                <span>{postData.title}</span>
            </Link>
          </div>
        );
      })}
    </>
  );
};
