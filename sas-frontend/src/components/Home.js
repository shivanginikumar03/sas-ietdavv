import React from 'react'
// import { useDispatch, useSelector} from 'react-redux'
// import { typeActions } from '../store/typeSlice'
import { useNavigate } from "react-router-dom";

function Home() {
    // const dispatch = useDispatch()
    const history = useNavigate()

    const setType = async (type)=>{
        // dispatch(typeActions.setType(type))
        localStorage.setItem("type", type)
        history("/login")
    }

    return (
        <div className='flex justify-center align-middle flex-col h-screen'>
            <img src="https://media4.giphy.com/media/6kkdoLdjDKUaC6JEKu/giphy.gif?cid=790b761112e64c9470b8c9e528fa6f189081d8533fcc3aef&rid=giphy.gif&ct=g" alt="collage" className='-z-10 absolute opacity-80 object-cover h-screen w-screen'/>
            <h1 className='text-3xl sm:text-4xl text-center font-medium' data-aos="fade-up" data-aos-duration="300">Student Attendance System</h1>
            <div className="buttons flex justify-center align-middle m-5">
                <a className='bg-black cursor-pointer text-white p-2 rounded-lg m-2' onClick={()=>{setType("student")}}>For Students</a>
                <a className='bg-black cursor-pointer text-white p-2 rounded-lg m-2' onClick={()=>{setType("teacher")}}>For Faculties</a>
            </div>
        </div>
    )
}

export default Home