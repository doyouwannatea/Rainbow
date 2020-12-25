import React, { useState } from 'react'

import Header from "./Header"
import WeatherList from "./WeatherList"
import Navbar from "./Navbar"

const App = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  
  const toggleNavbar = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setIsOpen(open)
  }

  const toggleCheme = () => {
   setIsDark(prevCheme => !prevCheme) 
  }

  return (
    <div className="app">
      <Navbar 
        isOpen={isOpen} 
        toggleNavbar={toggleNavbar}
        isDark={isDark}
        toggleCheme={toggleCheme}
      />
      <Header toggleNavbar={toggleNavbar} />
      <WeatherList />
    </div>
  )
}

export default App