import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        name,
        username,
        password,
      });
      if (response.data.status === "ok") {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response.data.error || "An error occurred");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Register</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Register
        </button>
        <Link to="/login" style={styles.link}>
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#282a36",
    color: "#f8f8f2",
    padding: "30px",
    borderRadius: "12px",
    maxWidth: "400px",
    margin: "50px auto",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
    textAlign: "center",
  },
  header: {
    color: "#bd93f9",
    marginBottom: "20px",
    fontSize: "24px",
  },
  error: {
    color: "#ff5555",
    marginBottom: "15px",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    backgroundColor: "#44475a",
    color: "#f8f8f2",
    border: "1px solid #6272a4",
    borderRadius: "6px",
    padding: "12px",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    backgroundColor: "#50fa7b",
    color: "#282a36",
    border: "none",
    borderRadius: "6px",
    padding: "12px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    textTransform: "uppercase",
  },
  buttonHover: {
    backgroundColor: "#3eca6f",
  },
  link: {
    marginTop: "10px",
    color: "#bd93f9",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.3s",
  },
  linkHover: {
    color: "#ff79c6",
  },
};

export default Register;
