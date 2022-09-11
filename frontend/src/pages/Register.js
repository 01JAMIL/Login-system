import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { register, resetState } from '../features/auth/userSlice'
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {

  const [show, setShow] = useState(true)
  const { loading, error, success } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const changeHandler = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = e => {
    e.preventDefault()

    dispatch(register(form))
  }


  useEffect(() => {
    if (success) {
      dispatch(resetState())
      navigate('/login', { replace: true })
    }

  }, [success, dispatch, navigate])

  const hide = (e) => {
    setShow(false)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="container-fluid">
      <form className="form" onSubmit={submitHandler}>
        {(error && error.existEmailError && show) && <div className="alert">
          <span className="closebtn" onClick={hide}>&times;</span>
          <strong>Error!</strong> {error.existEmailError}
        </div>}
        <div className="form-group">
          <label className="form-label" htmlFor="firstName">First name</label>

          <input
            type="text"
            className={`form-input ${(error && error.firstNameError) && 'invalid'}`}
            name="firstName"
            id="firstName"
            value={form.firstName}
            onChange={changeHandler}
          />

          {(error && error.firstNameError) && <div className="invalid-feedback">
            {error.firstNameError}
          </div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="lastName">Last name</label>
          <input
            type="text"
            className={`form-input ${(error && error.lastNameError) && 'invalid'}`}
            name="lastName"
            id="lastName"
            value={form.lastName}
            onChange={changeHandler}
          />
          {(error && error.lastNameError) && <div className="invalid-feedback">
            {error.lastNameError}
          </div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            type="email"
            className={`form-input ${((error && error.emailError) || (error && error.existEmailError)) && 'invalid'}`}
            name="email"
            id="email"
            value={form.email}
            onChange={changeHandler}
          />
          {(error && error.emailError) && <div className="invalid-feedback">
            {error.emailError}
          </div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            type="password"
            className={`form-input ${(error && error.passwordError) && 'invalid'}`}
            name="password"
            id="password"
            value={form.password}
            onChange={changeHandler}
          />
          {(error && error.passwordError) && <div className="invalid-feedback">
            {error.passwordError}
          </div>}
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Register
          </button>
        </div>

        <div className="text-center fs-12">
          <span>You already have account? <Link to='/login'>login</Link></span>
        </div>
      </form>
    </div>
  )
}

export default Register