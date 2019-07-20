import React from 'react'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>laboratory_tests app, my programming test for Terveystalo, July 2019</em>
    </div>
  )
}

export default Footer