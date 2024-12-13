import { Bars3Icon } from "@heroicons/react/16/solid";
import Link from "next/link";


const navs = [
  { id: "Rnsy6P7c61epk7p", name: "Blog", value: "/blog" },
  { id: "mjbL2Xs5VosmRNj", name: "Task", value: "/task" },
  { id: "JH9S4aZNdEXvyBL", name: "User", value: "/user" },
  { id: "q54Kev14A55Qgkk", name: "Company", value: "/company" },
]

export const Navbar = () => {
  return (
    <>
      <ul className="navbar">
        {
          navs.map((n) => (
            <li key={n.id} className="">
              <Link href={n.value} className="flex nav-li">
                <div className="w-full text-center ">
                  {n.name}
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
      <button className="block sm:hidden m-auhref dark:text-white duration-200">
        <Bars3Icon width={25}></Bars3Icon>
      </button>
    </>
  );
}