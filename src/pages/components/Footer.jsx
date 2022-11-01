import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className='footer'><a href="https://github.com/amanswarnakar">&copy; Aman Swarnakar {year}</a></div>
  )
}

export default Footer