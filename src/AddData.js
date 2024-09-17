import React, { useContext, useState } from 'react';
import { context } from './Context';

const AddDataComponent = () => {
  const [formType, setFormType] = useState('ticket');
  const [ticketData, setTicketData] = useState({
    id: '',
    title: '',
    tag: '',
    userId: '',
    status: 'Todo',
    priority: 0,
  });
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    available: false,
  });
  const {  data,setData ,setOpenAddData,setGroupBy,groupBy} = useContext(context)

  // Handler for adding a ticket
  const handleAddTicket = () => {
    const existingData = data
    existingData.tickets.push({
      ...ticketData,
      tag: ticketData.tag.split(',').map(tag => tag.trim()), // Convert comma-separated tags to an array
    });
    setData(existingData)
    localStorage.setItem("data",JSON.stringify(existingData))
    setGroupBy(groupBy == "status" ? "priority" :"status")
    setOpenAddData(false)
  };

  // Handler for adding a user
  const handleAddUser = () => {
    const existingData = data
    existingData.users.push(userData);
    setData(existingData)
    localStorage.setItem("data",JSON.stringify(existingData))
    setOpenAddData(false)
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4 text-black">
      <button onClick={()=>setOpenAddData(false)}>Close</button>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setFormType('ticket')}
          className={`py-2 px-4 rounded-md ${formType === 'ticket' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Add Ticket
        </button>
        <button
          onClick={() => setFormType('user')}
          className={`py-2 px-4 rounded-md ${formType === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Add User
        </button>
      </div>

      {formType === 'ticket' && (
        <div>
          <h1 className="text-xl font-semibold mb-2">Add New Ticket</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTicket();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              value={ticketData.id}
              onChange={(e) => setTicketData({ ...ticketData, id: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="ID"
            />
            <input
              type="text"
              value={ticketData.title}
              onChange={(e) => setTicketData({ ...ticketData, title: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="Title"
            />
            <input
              type="text"
              value={ticketData.tag}
              onChange={(e) => setTicketData({ ...ticketData, tag: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="Tags (comma separated)"
            />
            <input
              type="text"
              value={ticketData.userId}
              onChange={(e) => setTicketData({ ...ticketData, userId: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="User ID"
            />
            <select
              value={ticketData.status}
              onChange={(e) => setTicketData({ ...ticketData, status: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="Todo">Todo</option>
              <option value="In progress">In progress</option>
              <option value="Done">Done</option>
              <option value="Backlog">Backlog</option>
            </select>
            <input
              type="number"
              value={ticketData.priority}
              onChange={(e) => setTicketData({ ...ticketData, priority: +e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="Priority (0-5)"
              min="0"
              max="5"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Add Ticket
            </button>
          </form>
        </div>
      )}

      {formType === 'user' && (
        <div>
          <h1 className="text-xl font-semibold mb-2">Add New User</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddUser();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              value={userData.id}
              onChange={(e) => setUserData({ ...userData, id: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="User ID"
            />
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="Name"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={userData.available}
                onChange={(e) => setUserData({ ...userData, available: e.target.checked })}
                className="form-checkbox"
              />
              <span>Available</span>
            </label>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Add User
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddDataComponent;
