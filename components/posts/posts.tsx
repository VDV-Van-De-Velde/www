import React from "react";
import Link from "next/link";
import format from "date-fns/format";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const Posts = ({ data }) => {
  return (
    <>
      {data.map((postData) => {
        const post = postData.node;
        const date = new Date(post.date);
        let formattedDate = "";
        if (!isNaN(date.getTime())) {
          formattedDate = format(date, "MMM dd, yyyy");
        }
        return (
          <div key={post.id} className="mb-4 grow p-0 sm:p-4 md:w-1/3 max-w-2xl"> {/* Card container */}
            <div key={post.id} className="group h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden shadow-lg">
            <Link
                key={post.id}
                href={`/posts/` + post._sys.filename}
                passHref
              >
                <a key={post.id}>
                  {/* :CARD IMAGE & CATEGORY */}
                  <div className="relative w-full overflow-hidden">
                    {/* ::Image */}
                    {post._values.heroImg && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img  src={post._values.heroImg} alt={post._values.title} className="w-full h-full object-cover object-center transition-all duration-300 transform group-hover:scale-110"/>
                    )}
                    {/* ::Category */}
                    <h2 className="absolute top-6 left-6 inline-block pt-0.5 pb-1.5 px-2 rounded-md text-sm text-white subpixel-antialiased font-medium bg-gray-900 cursor-pointer">{post?.category?.name}</h2>
                  </div>

                  {/* :CARD BODY */}
                  <div className="my-6 py-3 px-8 flex flex-col justify-around items-center">
                    {/* ::Title */}
                    <h1 className="title-font text-2xl text-center font-bold text-gray-800 antialiased" >{post._values.title}</h1>
                    {/* ::Excerpt */}
                    <div className="line-clamp-8 py-5 overflow-hidden leading-relaxed text-sm text-gray-500 text-left font-medium cursor-pointer"><TinaMarkdown content={post._values.excerpt} /></div>
                    {/* ::RTags*/}
                    {/* <div className="flex flex-wrap justify-center space-x-2">
                      {post._values.tags && post._values.tags.map((tag, index)=>(
                        <span key={index} className="px-4 py-2 rounded-full text-white font-semibold text-sm flex align-center w-max cursor-pointer bg-gray-1000 transition duration-300 ease">
                          {tag}
                        </span>
                      ))}
                    </div> */}
                  </div>

                  {/* ::CARD FOOTER */}
                  <div className="py-3 px-2 flex flex-wrap justify-around border-t border-gray-200">
                    {/* ::Author */}
                    <span className="py-0.5 px-1.5 flex items-center text-xs text-gray-500 font-semibold tracking-wide cursor-pointer" >
                      <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      {post?.author?.name}
                    </span>
                    {/* ::Date */}
                    {formattedDate !== "" && (
                      <>
                        <span className="py-0.5 px-1.5 flex items-center text-xs text-gray-500 font-semibold tracking-wide">
                          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formattedDate}
                        </span>
                      </>
                    )}
                  </div>
                  </a>
                </Link> 
            </div>
          </div>
        );
      })}
    </>
  );
};
