import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3001/employee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees", err);
      alert("Unauthorized or failed to fetch employees");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3001/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Employee deleted successfully");
      fetchEmployees();
    } catch (err) {
      console.error("Delete error", err);
      alert("Failed to delete employee");
    }
  };

  const handleUpdate = (id) => {
    alert(`Update employee with ID: ${id}`);
  };

  const handleTask = (id) => {    
    navigate(`/tasks/employee/${id}`)
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Employee List</h2>

      {employees.length === 0 ? (
        <p className="text-center">No employees found.</p>
      ) : (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {employees.map((emp) => (
              <div key={emp.empId} className="card mb-3 shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <p className="mb-1"><strong>ID:</strong> {emp.empId}</p>
                    <p className="mb-1"><strong>Name:</strong> {emp.name}</p>
                    <p className="mb-0">
                      <strong>Roles:</strong>{" "}
                      {emp.roles?.map((role, index) => (
                        <span key={index}>
                          {role.roleName}
                          {index < emp.roles.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="d-flex">
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleUpdate(emp.empId)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleDelete(emp.empId)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-info me-2"
                      onClick={() => handleTask(emp.empId)}
                    >
                      Task
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
