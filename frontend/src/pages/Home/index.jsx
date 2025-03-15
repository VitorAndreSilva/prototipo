import { useEffect, useState, useRef } from 'react';
import './style.css'
import api from '../../services/api'

function Home() {
  let [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();
  
  async function getUsers() {
    try {
      const usersApi = await api.get('/usuarios/')
      setUsers(usersApi.data);
      console.log(users);
    } catch (error) {
      console.error("Erro:", error) ;
    }
  }

  async function createUsers() {
    try {
      await api.post('/usuarios/', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value
      })
      getUsers();
    } catch (error) {
      console.error("Erro:", error) ;
    }
   //console.log(inputName, "criado");
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
  }
  
  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div>
    <div className='container'>
      <form>
        <h1>LOGIN</h1>
        <input placeholder='Name' name='name' type="text" ref={inputName} />
        <input placeholder='Age' name='age' type="number" ref={inputAge} />
        <input placeholder='Email' name='email' type="email" ref={inputEmail} />
        <button type='button' onClick={createUsers}>LOGIN</button>
        <button type='reset'>LIMPAR</button>
      </form>
    </div>
    {users.map((user) => (
      <div key={user.id} className='users'>
        <div className='info'>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>E-mail: {user.email}</p>
        </div>
        <button onClick={() => deleteUsers(user.id)}>❌</button>
      </div>
    ))}
    </div>
  )
}

export default Home
