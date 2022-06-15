import "./App.css";
import { useState } from "react";
import Form from "./components/Form";
import Input from "./components/Input";

export default function App() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loginUser, setLoginUser] = useState({ username: "", password: "" });
  const [registerResponse, setRegisterResponse] = useState("");
  const [loginResponse, setLoginResponse] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    fetch(`http://localhost:4000/register`, opts)
      .then((res) => res.json())
      .then((userData) => {
        setRegisterResponse(
          `Thank you for registering, ${userData.data.username}!`
        );
      });
  };

  const login = async (e) => {
    e.preventDefault();
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser),
    };
    fetch(`http://localhost:4000/login`, opts)
      .then((res) => res.json())
      .then((loginUserData) => {
        setLoginResponse(
          `Hi, ${loginUser.username}, your token is ${loginUserData.data}`
        );
      });
  };

  // You can safely ignore everything below this line, it's just boilerplate
  // so you can focus on the exercise requirements

  const handleRegisterChange = (e) => {
    const { value, name } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLoginChange = (e) => {
    const { value, name } = e.target;

    setLoginUser({
      ...loginUser,
      [name]: value,
    });
  };

  return (
    <div className="App">
      <h1>Register</h1>

      <Form
        handleSubmit={register}
        inputs={[
          <Input
            key={1}
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            handleChange={handleRegisterChange}
          />,
          <Input
            key={2}
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            handleChange={handleRegisterChange}
          />,
        ]}
      />

      {registerResponse && <p>{registerResponse}</p>}

      <h1>Login</h1>

      <Form
        handleSubmit={login}
        inputs={[
          <Input
            key={1}
            type="text"
            name="username"
            placeholder="Username"
            value={loginUser.username}
            handleChange={handleLoginChange}
          />,
          <Input
            key={2}
            type="password"
            name="password"
            placeholder="Password"
            value={loginUser.password}
            handleChange={handleLoginChange}
          />,
        ]}
      />

      {loginResponse && <p>{loginResponse}</p>}
    </div>
  );
}
