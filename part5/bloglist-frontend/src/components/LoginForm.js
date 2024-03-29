import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        handleLogin({ username, password })
        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                username
                <input
                    type='text'
                    value={username}
                    id='username'
                    onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                password
                <input
                    type='password'
                    value={password}
                    id='password'
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button id='submit-button' type='submit'>login</button>
        </form>
    )}

export default LoginForm
