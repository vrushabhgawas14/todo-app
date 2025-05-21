import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "https://localhost:44365/api/CrudOperation";

function App() {
  const [records, setRecords] = useState([]);
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const response = await axios.get(`${baseUrl}/ReadRecord`);
    setRecords(response.data.readRecordData);
  };

  const handleSubmit = async () => {
    if (editId) {
      await axios.put(`${baseUrl}/UpdateRecord`, { id: editId, userName, age });
      setEditId(null);
    } else {
      await axios.post(`${baseUrl}/CreateRecord`, { userName, age });
    }
    setUserName("");
    setAge("");
    fetchRecords();
  };

  const handleEdit = (record: any) => {
    setUserName(record.userName);
    setAge(record.age);
    setEditId(record.id);
  };

  const handleDelete = async (id: any) => {
    await axios.delete(`${baseUrl}/DeleteRecord`, { data: { id } });
    fetchRecords();
  };

  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <div className="bg-yellow-500 p-4 space-x-2 rounded-xl border border-red-800">
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
          className="px-2 py-1 rounded-md"
        />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="number"
          placeholder="Age"
          className="px-2 py-1 rounded-md"
        />
        <button
          onClick={handleSubmit}
          className="bg-red-900 text-white px-2 py-1 rounded-lg font-bold"
        >
          Submit
        </button>

        <div className="flex justify-center mt-10">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record: any) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.userName}</td>
                  <td>{record.age}</td>
                  <td>
                    <button onClick={() => handleEdit(record)}>✏️</button>
                    <button onClick={() => handleDelete(record.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default App;
