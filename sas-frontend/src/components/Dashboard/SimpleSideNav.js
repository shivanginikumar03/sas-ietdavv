import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHome,
  faCog,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import Avatar from 'react-avatar';
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { navItemActions } from "../../store/navItemSlice";
import logo from "../../assets/logo.svg"

function SimpleSideNav() {
  const dispatch = useDispatch()
  const [mobileOpen, setMobileOpen] = useState(false)
  let history = useNavigate();

  let active = "flex justify-between no-underline w-full px-8 py-3 border-l-4 text-sm transition-colors duration-200 ease-in-out hover:text-blue-400 bg-blue-900 border-blue-400 cursor-pointer "
  let inactive = "flex justify-between no-underline w-full px-8 py-3 border-l-2 border-transparent text-sm transition-colors duration-200 ease-in-out hover:text-blue-400 cursor-pointer "

  let navClass =
    "w-72 max-w-full bg-blue-800 h-screen flex flex-col z-10 text-white fixed lg:absolute lg:sticky top-0 transition-transform transform duration-500 ease"
  if (mobileOpen) navClass += " translate-x-0"
  else navClass += " -translate-x-full lg:translate-x-0"

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem("type")
    history("/")
  }

  const userInfo = useSelector(state => state.userData.userData)
  const activeItem = useSelector(state=> state.navItem.number)
  const type = localStorage.getItem("type")

  const NavItem = (props) => {
    return (
      <div
        className={activeItem === props.number ? active : inactive}
        onClick={() => { dispatch(navItemActions.setNavItemNumber(props.number)) }}
      >
        <div>
          <FontAwesomeIcon icon={props.icon} className="mr-4" /> {props.option}
        </div>
      </div>
    )
  }

  return (
    <div className="">
      <div className={navClass}>
        <a href="/" className="no-underline block">
          <img
            src={logo}
            className=" mx-auto"
            alt="logo"
          />
        </a>
        <div className="flex-1">
          <div className="mt-6">
            <NavItem option = {type==="student"? "View Attendance": "Feed Attendance"} number = {0} icon={faHome}/>
            <NavItem option = "Analyze Attendance" number = {1} icon={faHome}/>
            <NavItem option = "Account Settings" number = {2} icon={faCog}/>
          </div>
        </div>

        <div className="flex px-8 py-6 items-center">
          <Avatar name={userInfo ? userInfo.name : "Name"} size="50" round={true} />
          <div className="flex-1 ml-4">
            <p className="font-medium leading-none">{userInfo ? userInfo.name : "Name"}</p>
            <p
              className="no-underline text-xs text-gray-300 leading-none cursor-pointer mt-1"
              onClick={handleLogout}
            >
              Logout
            </p>
          </div>
        </div>
      </div>
      <FontAwesomeIcon
        icon={mobileOpen ? faTimes : faBars}
        onClick={() => setMobileOpen(!mobileOpen)}
        className="absolute right-5 transform translate-x-double top-5 text-3xl text-blue-800 cursor-pointer lg:hidden"
      />
    </div>
  )
}

export default SimpleSideNav