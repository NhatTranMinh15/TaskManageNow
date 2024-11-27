'use client'
import React, { useState } from 'react'
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

type Props = {}

const DarkThemeToggle = (props: Props) => {
  const [darkMode, setDarkMode] = useState(false);
  function toogleDarkMode() {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark')
  }
  return (
    <button onClick={toogleDarkMode} className='border-2 border-black dark:border-white duration-150 p-2 rounded-2xl'>
      {darkMode ?
        <SunIcon width={25} color='white' />
        :
        <MoonIcon width={25} />
      }
    </button>
  )
}

export default DarkThemeToggle