import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { TodoProvider } from "./TodoContext";
import Todos from "./Todos";

const Dashboard = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic, such as clearing tokens, session, etc.
    // Once the logout is successful, call the logout function from the AuthContext
    logout();
    navigate("/", { replace: true });
    alert("You are logged out!!");
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-heading-wrapper">
        <h1 className="dashboard-heading">Dashboard Page</h1>
        {isAuthenticated && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
      <TodoProvider>
        <Todos />
      </TodoProvider>
    </div>
  );
};

export default Dashboard;
