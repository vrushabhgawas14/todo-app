import axios from "axios";
import { useEffect, useState } from "react";
import { Delete, Edit } from "lucide-react";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [userAge, setAge] = useState("");
  const [records, setRecords] = useState([]);
  const [updateID, setUpdateID] = useState(null);
  const baseUrl = "https://localhost:44371/api/CrudOperation";

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const response = await axios.get(`${baseUrl}/ReadRecord`);
    setRecords(response.data.readRecordData);
  };

  const handleRecord = async () => {
    let age: Number = Number.parseInt(userAge);
    if (updateID) {
      let id: Number = Number.parseInt(updateID);
      await axios.put(`${baseUrl}/UpdateRecord`, {
        id,
        userName,
        age,
      });
      setUpdateID(null);
    } else {
      await axios.post(`${baseUrl}/CreateRecord`, { userName, age });
    }

    setUserName("");
    setAge("");
    fetchRecords();
  };

  const deleteRecord = async (id: any) => {
    await axios.delete(`${baseUrl}/DeleteRecord`, { data: { id } });
    fetchRecords();
  };

  const updateRecord = (record: any) => {
    console.log(typeof record.age);
    setUpdateID(record.id);
    setUserName(record.userName ?? "");
    setAge(record.age?.toString() ?? "");
  };
  return (
    <>
      <main className="w-full text-sm flex flex-col justify-center items-center space-y-10">
        <section className="bg-red-800 w-[60vw] flex justify-center items-center rounded-xl mt-10">
          <div className="bg-yellow-500 w-[90%] my-4 p-4 flex flex-col gap-y-4 py-4 rounded-lg">
            <div className="flex flex-col">
              <label htmlFor="userName" className="text-sm">
                User Name
              </label>
              <input
                value={userName}
                id="userName"
                onChange={(e) => setUserName(e.target.value)}
                placeholder="John Doe"
                className="outline-none px-2 py-2 text-lg rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="age" className="text-sm">
                Age
              </label>
              <input
                value={userAge}
                id="age"
                onChange={(e) => setAge(e.target.value)}
                type="number"
                placeholder="20"
                className="outline-none px-2 py-2 text-lg rounded-md"
              />
            </div>

            <button
              onClick={handleRecord}
              className="bg-red-800 text-white w-fit px-2 py-1 rounded-lg border border-zinc-100"
            >
              Submit
            </button>
          </div>
        </section>

        <section className="bg-red-800 w-[60vw] flex justify-center items-center rounded-xl">
          <div className="bg-yellow-500 w-[90%] my-4 p-4 flex flex-col gap-y-4 py-4 rounded-lg">
            <div className="flex justify-between font-bold border-b border-black pb-1">
              <p>ID</p>
              <p>Name</p>
              <p>Age</p>
              <div className="flex space-x-10">
                <p>Edit</p>
                <p>Delete</p>
              </div>
            </div>
            {records.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between border-b border-black pb-1"
              >
                <p>{item.id}</p>
                <p>{item.userName}</p>
                <p>{item.age}</p>
                <div className="flex space-x-10">
                  <Edit onClick={() => updateRecord(item)} />
                  <Delete onClick={() => deleteRecord(item.id)} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
