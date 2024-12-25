import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You need to login first.");
      return;
    }

    axios
      .get("http://localhost:3000/home", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMessage(response.data);
      })
      .catch(() => {
        setError("You are not authorized to view this page.");
      });
  }, []);

  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        <>
          <h2 style={styles.message}>{message}</h2>
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#282a36",
    color: "#f8f8f2",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "600px",
    margin: "50px auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  error: {
    color: "#ff5555",
    marginBottom: "20px",
  },
  message: {
    color: "#bd93f9",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#50fa7b",
    color: "#282a36",
    border: "none",
    borderRadius: "4px",
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default Home;
