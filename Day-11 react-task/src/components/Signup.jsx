import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [roles, setRoles] = useState([]);

  function handleRoleChange(e) {
    const value = e.target.value;
    setRoles((prev) =>
      prev.includes(value)
        ? prev.filter((role) => role !== value)
        : [...prev, value]
    );
  }

  async function addNewEmployee(e) {
    e.preventDefault();

    try {
      const req = await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          name,
          email,
          password,
          username: userName,
          roleNames: roles,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(req.data);
      alert(req.data.message || "Registration successful!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed");
    }
  }

//                              RollNUMBER : 23AD102

  return (                  
    <section>
      <h2>SignUp</h2>
      <div>
        <form onSubmit={addNewEmployee}>
          <label htmlFor="name">Employee Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />

          <label htmlFor="email">Employee Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />

          <label htmlFor="password">Employee Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />

          <label htmlFor="userName">Employee Username: </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <br />

          <label>Employee Roles:</label>
          <br />
          <label>
            <input
              type="checkbox"
              value="ROLE_ADMIN"
              checked={roles.includes("ROLE_ADMIN")}
              onChange={handleRoleChange}
            />
            Admin
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="ROLE_USER"
              checked={roles.includes("ROLE_USER")}
              onChange={handleRoleChange}
            />
            User
          </label>
          <br />
          <br />

          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
