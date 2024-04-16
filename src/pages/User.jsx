import React from 'react'
import { useState, useEffect } from 'react';
import './Users.css';
import axios from 'axios'
import { toast } from 'react-toastify'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
function User({ verifyEmail }) {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setName] = useState('');
  const [password, setPassWord] = useState('');
  const [role, setRole] = useState('user');
  const [isCreated, setIsCreated] = useState(false);
  const [query, setQuery] = useState('');
  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8017/v1/users/getalluser')
      .then(response => {
        console.log(response.data)
        setDataUser(response.data)
      })
      .catch(error => {
        console.error('Error fetching report data:', error);
      });
  }, []);
  // Hàm để sao chép và thêm trạng thái Status
  const newDataUser = dataUser.map((user) => {
    if (user.email === verifyEmail) {
      return { ...user, status: 'Active' }; // Thêm trạng thái 'Active' nếu trùng email
    }
    return { ...user, status: 'Inactive' };
  });


  const handleAddUserClick = () => {
    setShowForm(true); // Hiển thị modal khi nhấn vào "Add user"
  };
  const handleFormClose = () => {
    setShowForm(false); // Đóng modal khi nhấn vào "Cancel" trong form
    setEmail('')
    setPhone('')
    setName('')
    setPassWord('')
    setIsCreated(false)

  };

  const handleChangeOption = (event) => {
    setRole(event.target.value); // Cập nhật giá trị đã chọn khi người dùng thay đổi
  };
  const handleSubmit = (event) => {


    event.preventDefault() // Ngăn chặn form submit mặc định
    // Gửi yêu cầu kiểm tra thông tin đăng nhập

    axios.post('http://localhost:8017/v1/users/createuser/', { email, phone, username, role, password })

      .then(response => {
        console.log(response.data.success)
        console.log(response.data.EM)
        if (response.data.success) {
          setIsCreated(true)
          toast.success('Created Successfully', { draggable: false })
          handleFormClose()
        }
        if (response.data.EM) {
          setIsCreated(false)
          toast.error('Failed', { draggable: false })

        }
      }
      )
      .catch(error => {
        console.error('Error:', error)
        toast.error('Wrong Information', { draggable: false })

      })
  }
  if (isCreated) {
    console.log('hihi')
  }
  return (
    <div className='user-container'>
      <div className='user-management'>
        User Management
      </div>
      <div className='user-tool'>
        <div className='search-bar'>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            className="search-input"
            onChange={() => setQuery(event.target.value)}

          />
          <button className="search-button"> <SearchOutlinedIcon /></button>
        </div>
        <label className='add-user' onClick={handleAddUserClick}> + Add user</label>
        {showForm && (
          <div className='modal-overlay'>
            <div className='modal-content'>
              <h2>Add New User</h2>
              <form className='user-form' onSubmit={handleSubmit} action="">
                <input
                  type='name'
                  placeholder='Name'
                  value={username}
                  onChange={() => setName(event.target.value)}
                  required />
                <input type='email'
                  placeholder='Email'
                  value={email}
                  onChange={() => setEmail(event.target.value)}
                  required
                />
                <input type='tel'
                  placeholder='Phone'
                  value={phone}
                  onChange={() => setPhone(event.target.value)}
                  required />
                <input type='pass'
                  placeholder='Password'
                  value={password}
                  onChange={() => setPassWord(event.target.value)}
                  required />

                <select value={role}
                  onChange={handleChangeOption}>
                  <option value='User'>User</option>
                  <option value='Admin'>Admin</option>

                </select>
                <button type='button' className='btn-cancel' onClick={handleFormClose}>Cancel</button>
                <button type='submit' className='btn-create'>Create</button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className='user-table'>
        <table className='table-user-data'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {newDataUser.map((item, index) => (
              <tr key={index} >
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.role}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;