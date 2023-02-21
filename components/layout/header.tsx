import React from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from "next/router";
import { Container } from "../util/container";
import { useTheme } from ".";
import { Icon } from "../util/icon";
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Script from "next/script";
import { ModalOptions } from "flowbite/lib/esm/components/modal/types";

export const Header = ({ data }) => {
  const router = useRouter();
  const theme = useTheme();
  const modalOptions: ModalOptions = {
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900 bg-opacity-50 fixed inset-0 z-11',
    closable: true,
  }
  const headerColor = {
    default:
      "text-black dark:text-white from-gray-50 to-white dark:from-gray-800 dark:to-gray-900",
    primary: {
      blue: "text-white from-blue-300 to-blue-500",
      teal: "text-white from-teal-400 to-teal-500",
      green: "text-white from-green-400 to-green-500",
      red: "text-white from-red-400 to-red-500",
      pink: "text-white from-pink-400 to-pink-500",
      purple: "text-white from-purple-400 to-purple-500",
      orange: "text-white from-orange-400 to-orange-500",
      yellow: "text-white from-yellow-400 to-yellow-500",
    },
  };

  const headerColorCss =
    data.color === "primary"
      ? headerColor.primary[theme.color]
      : headerColor.default;

  const activeItemClasses = {
    blue: "border-b-3 border-blue-200 text-blue-700 dark:text-blue-300 font-medium dark:border-blue-700",
    teal: "border-b-3 border-teal-200 text-teal-700 dark:text-teal-300 font-medium dark:border-teal-700",
    green:
      "border-b-3 border-green-200 text-green-700 dark:text-green-300 font-medium dark:border-green-700",
    red: "border-b-3 border-red-300 text-red-700 dark:text-green-300 font-medium dark:border-red-700",
    pink: "border-b-3 border-pink-200 text-pink-700 dark:text-pink-300 font-medium dark:border-pink-700",
    purple:
      "border-b-3 border-purple-200 text-purple-700 dark:text-purple-300 font-medium dark:border-purple-700",
    orange:
      "border-b-3 border-orange-200 text-orange-700 dark:text-orange-300 font-medium dark:border-orange-700",
    yellow:
      "border-b-3 border-yellow-300 text-yellow-700 dark:text-yellow-300 font-medium dark:border-yellow-600",
  };

  const activeBackgroundClasses = {
    blue: "text-blue-500",
    teal: "text-teal-500",
    green: "text-green-500",
    red: "text-red-500",
    pink: "text-pink-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
    yellow: "text-yellow-500",
  };

  // If we're on an admin path, other links should also link to their admin paths
  const [prefix, setPrefix] = React.useState("");

  React.useEffect(() => {
    if (window && window.location.pathname.startsWith("/admin")) {
      setPrefix("/admin");
    } 
    // if (window.PagefindUI) {
    //   new window.PagefindUI({ element: "#search" });
    // }
  }, []);

  return (
    <Disclosure as="nav"
      className={`sm:relative shadow-md sm:shadow-none z-20 absolute w-full smoverflow-hidden bg-gradient-to-b ${headerColorCss}`}
    >
      {({ open }) => (
      <>
        <Container size="custom" className="py-0 relative z-8 max-w-8xl">
          {/* Menu pleine ecran */}
          <div className="flex items-center justify-between gap-6">
            {/* Burger menu */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            {/* Burger menu */}
            {/* Icon + titre */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <h4 className="select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform">
                  <Link href="/" passHref className="block h-8 w-auto lg:hidden">
                    <a className=" gap-1 items-center whitespace-nowrap h-8 w-auto tracking-[.002em] flex lg:hidden">
                    <img 
                    className="max-h-10"
                        src="/uploads/logo.jpg"
                        alt="VDV Van De Velde Blog"
                      />
                      {/* <Icon
                        parentColor={data.color}
                        data={{
                          name: data.icon.name,
                          color: data.icon.color,
                          style: data.icon.style,
                        }}
                      />
                      {data.name} */}
                    </a>
                  </Link>
                  <Link href="/" passHref className="hidden h-8 w-auto lg:block">
                    <a className=" gap-1 items-center whitespace-nowrap h-8 w-auto tracking-[.002em] hidden lg:flex">
                      <img 
                      className="max-h-10"
                        src="/uploads/logo.jpg"
                        alt="VDV Van De Velde Blog"
                      />
                      {/* <Icon
                        parentColor={data.color}
                        data={{
                          name: data.icon.name,
                          color: data.icon.color,
                          style: data.icon.style,
                        }}
                      />
                      {data.name} */}
                    </a>
                  </Link>
                </h4>
              </div>
            </div>
            {/* fin Icon */}
            <button 
              data-modal-target="search" 
              data-modal-toggle="search" 
              className="block opacity-70 hover:opacity-100 text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center" 
              type="button"
              onClick={(e)=>{
                if (window.PagefindUI && document.getElementsByClassName("pagefind-ui").length == 0) {
                  new window.PagefindUI({ element: "#search" });
                }
                console.log(e);
              }}
              onError={(e) => {
                console.error('Script failed to load', e)
              }}
            >
            
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12.7549 11.255H11.9649L11.6849 10.985C12.6649 9.845 13.2549 8.365 13.2549 6.755C13.2549 3.165 10.3449 0.255005 6.75488 0.255005C3.16488 0.255005 0.254883 3.165 0.254883 6.755C0.254883 10.345 3.16488 13.255 6.75488 13.255C8.36488 13.255 9.84488 12.665 10.9849 11.685L11.2549 11.965V12.755L16.2549 17.745L17.7449 16.255L12.7549 11.255ZM6.75488 11.255C4.26488 11.255 2.25488 9.245 2.25488 6.755C2.25488 4.26501 4.26488 2.255 6.75488 2.255C9.24488 2.255 11.2549 4.26501 11.2549 6.755C11.2549 9.245 9.24488 11.255 6.75488 11.255Z" fill="#000000"/></svg>
            </button>
            <div id="search" className="fixed mt-24 top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" >
            <Script 
              src="/pagefind/pagefind-ui.js" 
              onError={(e) => {
                console.error('Script failed to load', e)
              }}
              />
            {/* <script
              src="/pagefind/pagefind-ui.js"
              type="text/javascript"
            ></script> */}
            </div>

            <ul className="gap-6 sm:gap-8 lg:gap-10 tracking-[.002em] -mx-4 hidden sm:flex">
              <div className="flex space-x-4">
                {data.nav &&
                  data.nav.map((item, i) => {
                  const activeItem =
                    item.href === ""
                      ? router.asPath === "/"
                      : router.asPath.includes(item.href);
                  return (
                    <li
                      key={`${item.label}-${i}`}
                      className={`${
                        activeItem ? activeItemClasses[theme.color] : ""
                      }`}
                    >
                      <Link href={item.target ? `${prefix}/${item.href}` : item.href} passHref>
                        <a
                          target= {item.target ? "_self" : "_blank"}
                          className={`relative select-none	text-base inline-block tracking-wide transition duration-150 ease-out hover:opacity-100 py-8 px-4 ${
                            activeItem ? `` : `opacity-70`
                          }`}
                        >
                          {item.label}
                          {activeItem && (
                            <svg
                              className={`absolute bottom-0 left-1/2 w-[180%] h-full -translate-x-1/2 -z-1 opacity-10 dark:opacity-15 ${
                                activeBackgroundClasses[theme.color]
                              }`}
                              preserveAspectRatio="none"
                              viewBox="0 0 230 230"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="230"
                                y="230"
                                width="230"
                                height="230"
                                transform="rotate(-180 230 230)"
                                fill="url(#paint0_radial_1_33)"
                              />
                              <defs>
                                <radialGradient
                                  id="paint0_radial_1_33"
                                  cx="0"
                                  cy="0"
                                  r="1"
                                  gradientUnits="userSpaceOnUse"
                                  gradientTransform="translate(345 230) rotate(90) scale(230 115)"
                                >
                                  <stop stopColor="currentColor" />
                                  <stop
                                    offset="1"
                                    stopColor="currentColor"
                                    stopOpacity="0"
                                  />
                                </radialGradient>
                              </defs>
                            </svg>
                          )}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </div>
            </ul>
          </div>
          {/* fin Menu pleine ecran */}
          <div
            className={`absolute h-1 bg-gradient-to-r from-transparent ${
              data.color === "primary" ? `via-white` : `via-black dark:via-white`
            } to-transparent bottom-0 left-4 right-4 -z-1 opacity-5`}
          />
        </Container>
        <Disclosure.Panel className="sm:hidden shadow-md">
          <div className="space-y-1 px-2 pt-2 pb-3  shadow-md">
            {data.nav &&
              data.nav.map((item) => {
                const activeItem =
                  item.href === ""
                    ? router.asPath === "/"
                    : router.asPath.includes(item.href);
                return (
                  <Disclosure.Button
                    key={item.label}
                    as="a"
                    href={item.target ? `${prefix}/${item.href}` : item.href}
                    target= {item.target ? "_self" : "_blank"}
                    className={` select-none text-base text-headerblack hover:opacity-100 hover:bg-gray-700 py-2 px-4 block ${
                      activeItem ? `` : `opacity-70`
                    }`}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.label}
                  </Disclosure.Button>
              );
            })}
          </div>
        </Disclosure.Panel>
      </>
      )}
    </Disclosure>
  );
};
