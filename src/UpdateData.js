import React, { useContext, useEffect, useRef, useState } from 'react';
import { context } from './Context';

const UpdateData = () => {
    const {  data,setData ,setOpenUpdate,updateId} = useContext(context)
    const [ticketData, setTicketData] = useState(data.tickets.filter(c => c.id == updateId)[0]);


  // Handler for adding a ticket
  const handleUpdate = () => {
    const existingData = data
    var updateddata = {tickets:existingData.tickets.filter(c => c.id !== updateId),users:existingData.users}

    updateddata.tickets.push(ticketData);
    setData(updateddata)
    localStorage.setItem("data",JSON.stringify(updateddata))
    setOpenUpdate(false)
  };

  const deleteHandle = ()=>{
    const existingData = data
    var updateddata = {tickets:existingData.tickets.filter(c => c.id !== updateId),users:existingData.users}
    setData(updateddata)
    localStorage.setItem("data",JSON.stringify(updateddata))
    setOpenUpdate(false)
  }


  return (
    <div  className="p-4 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4 text-black">
      <button onClick={()=>setOpenUpdate(false)}>Close</button>
        <div>
          <h1 className="text-xl font-semibold mb-2">Update</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
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
              onChange={(e) => setTicketData({ ...ticketData, tag:e.target.value.split(',').map(tag => tag.trim())})}
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
              Update
            </button>
          </form>
            <button
              onClick={deleteHandle}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mt-2"
            >
              Delete
            </button>
        </div>
      

    
    </div>
  );
};

export default UpdateData;
