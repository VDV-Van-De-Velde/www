/**
Copyright 2021 Forestry.io Holdings, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { useTheme } from "../layout";
import format from "date-fns/format";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Prism } from "tinacms/dist/rich-text/prism";
import type { TinaMarkdownContent, Components } from "tinacms/dist/rich-text";

import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';

const components: Components<{
  BlockQuote: {
    children: TinaMarkdownContent;
    authorName: string;
  };
  DateTime: {
    format?: string;
  };
  NewsletterSignup: {
    placeholder: string;
    buttonText: string;
    children: TinaMarkdownContent;
    disclaimer?: TinaMarkdownContent;
  };
  Gallery:{
    Images: any;
  };
  Youtube: {
    id: string;
  };
  BlockImgText: {
    position: string;
    children: TinaMarkdownContent;
    src: string;
    alt: string;
  };
}> = {
  code_block: (props) => <Prism {...props} />,
  BlockQuote: (props: {
    children: TinaMarkdownContent;
    authorName: string;
  }) => {
    return (
      <div>
        <blockquote>
          <TinaMarkdown content={props.children} />
          {props.authorName}
        </blockquote>
      </div>
    );
  },
  DateTime: (props) => {
    const dt = React.useMemo(() => {
      return new Date();
    }, []);

    switch (props.format) {
      case "iso":
        return <span>{dt.toISOString()}</span>;
      case "utc":
        return <span>{dt.toUTCString()}</span>;
      case "local":
        return <span>{dt.toLocaleDateString()}</span>;
      default:
        return <span>{dt.toLocaleDateString()}</span>;
    }
  },
  NewsletterSignup: (props) => {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="">
            <TinaMarkdown content={props.children} />
          </div>
          <div className="mt-8 ">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:max-w-xs rounded-md"
                placeholder={props.placeholder}
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-3 px-5 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  {props.buttonText}
                </button>
              </div>
            </form>
            <div className="mt-3 text-sm text-gray-500">
              {props.disclaimer && <TinaMarkdown content={props.disclaimer} />}
            </div>
          </div>
        </div>
      </div>
    );
  },
  img: (props) => (
    <div className="flex items-center justify-center">
      <img src={props.url} alt={props.alt} />
    </div>
  ),
  Youtube: (props) => (
    <div className="embed-responsive embed-responsive-16by9 pt-[56.25%] relative w-full overflow-hidden">
      <iframe
        className="embed-responsive-item absolute top-0 right-0 bottom-0 left-0 w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${props.id}`} >
        </iframe>
    </div>
  ),
  Gallery: (props) =>(
    <div className="container py-8">
      <LightGallery
          plugins={[lgZoom]}
      >
        {props.Images?.map( (image, index )=>(
          <a 
            key={index}
            className="gallery-item w-1/3 grow m-3 inline-block"
            data-src={image.src}
          >
            <img alt={image.alt} className="img-responsive" src={image.src}/>
          </a>
        ))}
      </LightGallery>    
    </div>
  ),
  BlockImgText: (props) => (
    <Container
        size="large"
        className={`flex flex-wrap items-center justify-center ${props.position === "left" ? "flex-row-reverse":"flex-row"}`}
      >
        <div className="">
            <div className={`prose prose-lg mx-auto lg:mx-0 mb-10`}>
              <TinaMarkdown content={props.children} />
            </div>
        </div>
        <div className=" max-w-1/3 flex justify-center" >
          <img
            className=" z-10 w-full rounded-lg lg:max-w-sm max-w-none h-auto"
            alt={props.alt}
            src={props.src}
          />
        </div>
      </Container>
  )
};

export const Post = (props) => {

  const date = new Date(props.date);
  let formattedDate = "";
  if (!isNaN(date.getTime())) {
    formattedDate = format(date, "MMM dd, yyyy");
  }

  return (
    <Section className="flex-1">
      <Container width="large" className={`flex-1 pb-2`} size="large">
        <h2
          data-tinafield="title"
          data-pagefind-meta="title"
          className={`w-full relative	mb-8 text-6xl font-extrabold tracking-normal text-center title-font`}
        >
          <span
            className={`bg-clip-text text-gray-900`}
          >
            {props.title}
          </span>
        </h2>
        <div className="flex items-center justify-center flex-col mb-16">
          <div
            data-tinafield="author"
            className="flex items-center justify-center "
          >
            {props.author && (
              <>
                <div className="flex-shrink-0 mr-4">
                  <img
                    className="h-14 w-14 object-cover rounded-full shadow-sm"
                    src={props.author.avatar}
                    alt={props.author.name}
                  />
                </div>
                <p data-pagefind-filter="author" className="text-base font-medium text-gray-600 group-hover:text-gray-800 dark:text-gray-200 dark:group-hover:text-white">
                  {props.author.name}
                </p>
                <span className="font-bold text-gray-200 dark:text-gray-500 mx-2">
                  —
                </span>
              </>
            )}
            <p
              data-pagefind-meta="date"
              data-tinafield="date"
              className="text-base text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150"
            >
              {formattedDate}
            </p>
          </div>
          <div className="flex items-center justify-center mb-2">
            {props.category &&(
              <>
                <p data-pagefind-meta="Category" data-tinafield="category" className="text-base font-bold italic text-gray-700">
                  {props.category.name}
                </p>
              </>
            )}
          </div>
          <div className="flex flex-wrap justify-center space-x-2">
            {props.tags && props.tags.map((tag, index)=>(
              <span key={index} data-pagefind-meta="Tags" className="px-4 py-2 rounded-full text-white font-semibold text-sm flex align-center w-max cursor-pointer bg-gray-1000 transition duration-300 ease">
                {tag}
              </span>
            ))}
            
          </div>
        </div>
      </Container>
      {props.heroImg && (
        <div className="px-4 w-full">
          <div
            data-tinafield="heroImg"
            className="relative max-w-6xl lg:max-w-5xl mx-auto"
          >
            <img
              data-pagefind-meta="image[src]"
              src={props.heroImg}
              className="absolute block rounded-lg w-full h-auto blur-2xl brightness-150 contrast-[0.9] dark:brightness-150 saturate-200 opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-hard-light"
              aria-hidden="true"
            />
            <img
              src={props.heroImg}
              alt={props.title}
              className="relative z-10 mb-14 block rounded-lg w-full h-auto opacity-100"
            />
          </div>
        </div>
      )}
      <Container className={`flex-1 pt-4`} width="large" size="large">
        <div data-pagefind-body className="prose dark:prose-dark w-full max-w-none">
          <TinaMarkdown components={components} content={props._body} />
        </div>
      </Container>
    </Section>
  );
};
