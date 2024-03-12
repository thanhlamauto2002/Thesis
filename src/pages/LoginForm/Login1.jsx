import './Login1.css'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import { Container } from '@mui/material'
import { useState } from 'react'
import loginApi from '~/service/UserServide'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Login1 = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  return (
    <Container className='container-login'>
      <div className='wrapper'>
        <form action="">
          <h1>Login </h1>
          <div className='input-box'>
            <input type='text'
              placeholder='Username'
              value={email}
              onChange={() => setEmail(event.target.value)}
              required />
            <PersonIcon className='icon' />
          </div>
          <div className='input-box'>
            <input type='password' placeholder='Password'
              value={password}
              onChange={() => setPassword(event.target.value)}
              required />
            <LockIcon className='icon' />
          </div>

          <div className='remember-forgot'>
            <label><input type='checkbox' /> Remember me</label>
            <a href='#'>Forgot password?</a>
          </div>

          <button
            className={email && password ? 'active' : ''}
            disabled={email && password ? false : true}
          >Login</button>
          <div className='register-link'>
            <p> Don't have an account? <a href='#'>Register</a></p>
          </div>
        </form>
      </div>
    </Container>
  )
}
export default Login1