import React, { useState, useEffect } from "react";
import SimpleTable from "./components/SimpleTable";


const App: React.FC = () => {
  const [userData, setUserData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id: number, newData: any) => {
    const updatedUserData = userData.map(user => {
      if (user.id === id) {
        return { ...user, ...newData };
      }
      return user;
    });
    setUserData(updatedUserData);
  };

  const handleDelete = (id: number) => {
    const updatedUserData = userData.filter(user => user.id !== id);
    setUserData(updatedUserData);
  };

  const columnDefs = [
    { headerName: "S.No", field: "id" },
    { headerName: "User Name", field: "name", editable: true },
    { headerName: "Email", field: "email" },
    { headerName: "Address", field: "address", editable: true },
    { headerName: "Action", field: "action" },
  ];

  const data = userData.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    address: user.address && `${user.address.street},${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`,
    action: (
      <div>
        <button className="edit-button" onClick={() => handleEdit(user.id, { name: "New Name", email: user.email, address: "New Address" })}>Edit</button>
        <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
      </div>
    ),
  }));

  return (
    <div className="app-container"> {/* Add a container for styling */}
      <h1>User Data Table</h1>
      <SimpleTable columnDefs={columnDefs} data={data} />
    </div>
  );
};

export default App;
