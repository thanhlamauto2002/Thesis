import './Login1.css'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const Login1 = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate() // Sử dụng history để điều hướng
  const handleSubmit = (event) => {


    event.preventDefault() // Ngăn chặn form submit mặc định
    // Gửi yêu cầu kiểm tra thông tin đăng nhập

    axios.post('http://localhost:8017/v1/users/checkuser', { email, password }
    )
      .then(response => {
        if (response.data.success) {
          navigate('/stations')
          toast.success('Login Successfully', { draggable: false })
          console.log(response.data.message)
        }
      })
      .catch(error => {
        console.error('Error:', error)
        toast.error('Email or password is incorrect', { draggable: false })
        setEmail('')
        setPassword('')
      })
  }

  return (
    <div className='container-login' >

      <div className='wrapper'>
        <form onSubmit={handleSubmit} action="">
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

          <button
            type='submit'
            className={email && password ? 'active' : ''}
            disabled={email && password ? false : true}
          >Login</button>
          <div className='register-link'>
            <p> Don't have an account? <a href='#'>Register</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login1
