import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, resetState } from '../features/auth/userSlice'

const Navbar = () => {
    const { token } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const dispatchLogout = () => {
        dispatch(logout())
        dispatch(resetState())
        navigate('/login')
    }

    return (
        <nav className='navbar'>

            <div className='nabvar-brand'>
                LOGO
            </div>

            <ul className='navbar-links'>
                {token && <li className='navbar-link' >
                    <NavLink className={({ isActive }) => isActive ? 'active' : ''} to='/'>Home</NavLink>
                </li>}

                {!token &&
                    <>
                        <li className='navbar-link' >
                            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to='/register'>Register</NavLink >
                        </li>

                        <li className='navbar-link' >
                            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to='/login'>Login</NavLink>
                        </li>
                    </>}

                {token &&
                    <li className='navbar-link' >
                        <span className='navbar-btn' onClick={dispatchLogout}>
                            Logout
                        </span>
                    </li>}

            </ul>
        </nav>
    )
}

export default Navbar