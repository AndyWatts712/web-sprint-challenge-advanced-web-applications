import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth"
import { useHistory } from 'react-router-dom'


const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [form, setForm] = useState([])
  const history = useHistory()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = (e) => {
      e.preventDefault();
      axiosWithAuth()
        .post("/api/login", { username: 'Lambda', password: 'school' })
        .then((res) => {
          console.log(res)
          localStorage.setItem("token", res.data.payload);
          history.push("/protected");
        })
        .catch((err) => console.log(err));
  
  }


  return (
    <div>
      <form onSubmit={handleLogin}> Login
        <div>
          <input
            type='text'
            name='username'
            placeholder='username'
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type='password'
            name='password'
            placeholder='password'
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
