import React from 'react'
import { useState, useEffect } from 'react';
import './Users.css';
import axios from 'axios'
import { toast } from 'react-toastify'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CircleIcon from '@mui/icons-material/Circle';
function User({ verifyEmail, token }) {
  //đóng mở 2 form
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  //infor form đăng kí
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setName] = useState('');
  const [password, setPassWord] = useState('');
  const [role, setRole] = useState('User');
  //biến xác định đã thực thi thành công
  const [isCreated, setIsCreated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const [dataUser, setDataUser] = useState([]);
  const [dataUserToSearch, setDataUserToSearch] = useState([]);

  //infor form modify
  const [usernameEdit, setNameEdit] = useState('');
  const [emailEdit, setEmailEdit] = useState('');
  const [phoneEdit, setPhoneEdit] = useState('');
  const [roleEdit, setRoleEdit] = useState('');
  const [emailToEdit, setEmailToEdit] = useState('');
  //search
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8017/v1/users/getalluser')
      .then(response => {
        setDataUser(response.data)
        setDataUserToSearch(response.data)
      })
      .catch(error => {
        console.error('Error fetching report data:', error);
      });
    setIsCreated(false)
    setIsDeleted(false)
    setIsEdited(false)
  }, [isCreated, isDeleted, isEdited]);


  // Hàm để sao chép và thêm trạng thái Status
  const newDataUser = dataUser.map((user) => {
    if (user.email === verifyEmail) {
      return { ...user, status: 'Online' }; // Thêm trạng thái 'Active' nếu trùng email
    }
    return { ...user, status: 'Offline' };
  });


  const handleAddUserClick = () => {
    setShowForm(true); // Hiển thị modal khi nhấn vào "Add user"
  };
  const handleFormClose = () => {
    setShowFormEdit(false)
    setShowForm(false); // Đóng modal khi nhấn vào "Cancel" trong form
    setEmail('')
    setPhone('')
    setName('')
    setPassWord('')
  };

  const handleChangeOption = (event) => {
    setRole(event.target.value); // Cập nhật giá trị đã chọn khi người dùng thay đổi
  };
  const handleChangeOptionModify = (event) => {
    setRoleEdit(event.target.value); // Cập nhật giá trị đã chọn khi người dùng thay đổi
  };
  //modify
  const handleClickModify = (email) => {
    setShowFormEdit(true)
    setEmailToEdit(email)
    axios.get(`http://localhost:8017/v1/users/getuser/?email=${email}`)
      .then(response => {
        setNameEdit(response.data.username)
        setEmailEdit(response.data.email)
        setPhoneEdit(response.data.phone)
        setRoleEdit(response.data.role)
      })
  };
  //delete
  const handleClickDelete = (email) => {
    axios.post(`http://localhost:8017/v1/users/deleteuser/?token=${token}`, { email })
      .then(response => {
        console.log(response.data)
        if (response.data.delete) {
          setIsDeleted(true)
          toast.success('Deleted Successfully', { draggable: false })
        }
        if (response.data.message) {
          toast.warning('You are not authorized', { draggable: false })

        }

      })
  };
  const handleSubmit = (event) => {
    event.preventDefault() // Ngăn chặn form submit mặc định
    // Gửi yêu cầu kiểm tra thông tin đăng nhập

    axios.post(`http://localhost:8017/v1/users/createuser/?token=${token}`, { email, phone, username, role, password })

      .then(response => {
        console.log(response.data.success)
        console.log(response.data.EM)
        if (response.data.success) {
          setIsCreated(true)
          console.log('created: ', isCreated)
          toast.success('Created Successfully', { draggable: false })
          handleFormClose()
        }
        if (response.data.EM) {
          setIsCreated(false)
          toast.error('Failed', { draggable: false })

        }
        if (response.data.message) {
          toast.warning('You are not authorized', { draggable: false })

        }
      }
      )
      .catch(error => {
        console.error('Error:', error)
        toast.error('Wrong Information', { draggable: false })

      })
  }
  const handleSave = (event) => {
    event.preventDefault() // Ngăn chặn form submit mặc định
    // Gửi yêu cầu kiểm tra thông tin đăng nhập

    axios.post(`http://localhost:8017/v1/users/edituser/?token=${token}`, { emailToEdit, emailEdit, phoneEdit, usernameEdit, roleEdit })

      .then(response => {
        if (response.data.edit) {
          setIsEdited(true)
          toast.success('Saved Successfully', { draggable: false })
          handleFormClose()
        }
        if (response.data.message) {
          toast.warning('You are not authorized', { draggable: false })

        }
      }
      )
      .catch(error => {
        console.error('Error:', error)
        toast.error('Wrong Information', { draggable: false })

      })
  }
  // hàm tìm kiếm
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const term = event.target.value;
    if (term !== '') {
      const results = dataUserToSearch.filter(user => {
        const usernameMatch = user.username.toLowerCase().includes(searchTerm);
        const emailMatch = user.email.toLowerCase().includes(searchTerm);
        const phoneMatch = user.phone.toLowerCase().includes(searchTerm);
        const roleMatch = user.role.toLowerCase().includes(searchTerm);
        return usernameMatch || emailMatch || phoneMatch || roleMatch;
      });
      setSearchResults(results);
    } else { setSearchResults(dataUserToSearch) }

  }
  console.log('searc:', searchResults)
  useEffect(() => {
    setDataUser(searchResults)
  }, [searchResults]);
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
            value={searchTerm}
            className="search-input"
            onChange={handleSearch}
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
        {showFormEdit && (
          <div className='modal-overlay'>
            <div className='modal-content'>
              <h2>Modify User</h2>
              <form className='user-form' onSubmit={handleSave} action="">
                <input
                  type='name'
                  placeholder='Name'
                  value={usernameEdit}
                  onChange={() => setNameEdit(event.target.value)}
                  required />
                <input type='email'
                  placeholder='Email'
                  value={emailEdit}
                  onChange={() => setEmailEdit(event.target.value)}
                  required
                />
                <input type='tel'
                  placeholder='Phone'
                  value={phoneEdit}
                  onChange={() => setPhoneEdit(event.target.value)}
                  required />


                <select value={roleEdit}
                  onChange={handleChangeOptionModify}>
                  <option value='User'>User</option>
                  <option value='Admin'>Admin</option>

                </select>
                <button type='button' className='btn-cancel' onClick={handleFormClose}>Cancel</button>
                <button type='submit' className='btn-create'>Save</button>
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
                <td className='status-user'>
                  <CircleIcon className='circle' id={item.status === 'Online' ? 'green-color' : 'white-color'} />
                  {item.status}
                  <ModeEditOutlineOutlinedIcon className='modify-icon' onClick={() => handleClickModify(item.email)} />
                  <DeleteOutlinedIcon className='delete-icon' onClick={() => handleClickDelete(item.email)}
                  /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;