import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/Auth";
import { useEffect } from "react";
import { isAuthenticated } from "../../utils/Auth";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
  if (isAuthenticated()) {
    navigate("/dashboard", { replace: true });
  }
}, [navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    const success = login(username, password);

    if (success) {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid Username or Password.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "380px",
          background: "#fff",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0 5px 20px rgba(0,0,0,.15)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
            marginBottom: "5px",
          }}
        >
          EduTrack
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Classroom & Student Management Portal
        </p>

        <label>
          <strong>Username</strong>
        </label>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "18px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />

        <label>
          <strong>Password</strong>
        </label>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />

        <div
          style={{
            marginTop: "12px",
            marginBottom: "18px",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />

            Show Password
          </label>
        </div>

        {error && (
          <p
            style={{
              color: "red",
              marginBottom: "18px",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            background: "#1056edee",
            color: "#fff",
            fontSize: "16px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <div
          style={{
            marginTop: "25px",
            textAlign: "center",
            color: "#666",
            fontSize: "14px",
          }}
        >
          <p>
            <strong>Demo Credentials</strong>
          </p>

          <p>Username : Ashwini</p>

          <p>Password : Ashwini123</p>
        </div>
      </form>
    </div>
  );
}