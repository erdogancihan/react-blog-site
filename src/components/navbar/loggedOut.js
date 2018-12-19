import React from 'react'
import {Link} from "react-router-dom"

const LoggedOut = ({strings,toggleClass}) => {
  return (
    <div className="nav-link">
    <Link to="/signin"onClick={toggleClass}>{strings.navbar.login}</Link>
  </div>
  )
}

export default LoggedOut
