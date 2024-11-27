import { Bars3Icon } from "@heroicons/react/16/solid";
import Link from "next/link";

export const Navbar = () => {
  // console.log("Render Navbar");
  
  return (
    <>
      <ul className="navbar">
        <li className="nav-li ">
          <Link href="/task" className="flex">
            <div className="w-full text-center ">
              Task
            </div>
          </Link>
        </li>
        <li className="nav-li ">
          <Link href="/user" className="flex">
            <div className="w-full text-center">
              User
            </div>
          </Link>
        </li>
        <li className="nav-li ">
          <Link href="/company" className="flex">
            <div className="w-full text-center">
              Company
            </div>
          </Link>
        </li>
      </ul>
      <button className="block sm:hidden m-auhref dark:text-white duration-200">
        <Bars3Icon width={25}></Bars3Icon>
      </button>
    </>
  );
}