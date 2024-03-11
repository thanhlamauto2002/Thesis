import './Login1.css'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import { Container } from '@mui/material'
const Login1 = () => {
  return (
    <Container className='container-login'>
      <div className='wrapper'>
        <form action="">
          <h1>Login </h1>
          <div className='input-box'>
            <input type='text'
              placeholder='Username' required />
            <PersonIcon className='icon' />
          </div>
          <div className='input-box'>
            <input type='password' placeholder='Password' required />
            <LockIcon className='icon' />
          </div>

          <div className='remember-forgot'>
            <label><input type='checkbox' /> Remember me</label>
            <a href='#'>Forgot password?</a>
          </div>

          <button type='submit'>Login</button>
          <div className='register-link'>
            <p> Don't have an account? <a href='#'>Register</a></p>
          </div>
        </form>
      </div>
    </Container>
  )
}
export default Login1