import React from 'react'
import {Link} from "react-router-dom"

const LoggedOut = ({strings}) => {
  return (
    <div className="nav-link">
    <Link to="/signin">{strings.navbar.login}</Link>
  </div>
  )
}

export default LoggedOut
