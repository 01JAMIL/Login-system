import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { login } from '../features/auth/userSlice'

const Login = () => {

  const [show, setShow] = useState(true)
  const { token, loading, error, success } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({
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
    dispatch(login(form))
  }

  useEffect(() => {
    if (success && token) {
      navigate('/', { replace: true })
    }
  }, [success, token, navigate])


  const hide = (e) => {
    setShow(false)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="container-fluid">
      <form className="form" onSubmit={submitHandler}>
        {/* credentials */}
        {(error && error.badCredentials && show) && <div className="alert">
          <span className="closebtn" onClick={hide}>&times;</span>
          <strong>Error!</strong> {error.badCredentials}
        </div>}
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            type="email"
            className={`form-input ${error && error.emailError && 'invalid'}`}
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
            className={`form-input ${error && error.passwordError && 'invalid'}`}
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
            Login
          </button>
        </div>

        <div className="text-center fs-12">
          <span>You don't have account? <Link to='/register'>register</Link></span>
        </div>
      </form>
    </div>
  )
}

export default Login