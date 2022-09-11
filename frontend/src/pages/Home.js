import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMe } from '../features/auth/userSlice'
import Loading from '../components/Loading'
const Home = () => {
    const { token, user, loading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMe(token))
    }, [dispatch])

    if (loading) {
        return <Loading />
    }
    return (
        <div>
            {user.user &&
                <>
                    <div>Welcome <strong>{user.user.firstName + ' ' + user.user.lastName}</strong></div>
                    <div>Email : <strong> {user.user.email} </strong></div>
                </>}
        </div>
    )
}

export default Home