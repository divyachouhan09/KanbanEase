import axios from "axios"
import React, { useEffect, useState } from "react"

export const context = React.createContext()

export const MyProvider = ({ children }) => {
   const [theme, setTheme] = useState(true)
   const [data,setData] = useState( {tickets:[],users:[]})
   
  const [openAddData,setOpenAddData] = useState(false)
  const [openUpdate,setOpenUpdate] = useState(false)
  
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');
  const [groupedData, setGroupedData] = useState({});
  const [sortedData, setSortedData] = useState({});
  const [updateId,setUpdateId] = useState()
  console.log(data)

  useEffect(()=>{
    if (localStorage.getItem("data")) setData(JSON.parse(localStorage.getItem("data")))
      else localStorage.setItem("data",JSON.stringify(data))
  },[localStorage])

  //   useEffect(() => {
  //   fetchData();
  // }, []);

  //  const fetchData = async () => {
  //       try {
  //         const response = await axios.get('https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers');
    
  //         if (response) {
  //           const data = response.data;
  //           setData(data);
  //         }
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     };

      useEffect(() => {
         groupData(groupBy)
         sortData(sortBy)
       }, [data])
     
       useEffect(() => {
         groupData(groupBy)
       }, [groupBy,data])
     
       useEffect(() => {
         sortData(sortBy)
       }, [sortBy, groupedData,data])
     
     
     
       const groupData = (group) => {
         const groupData = {};
         var arr = [];
         if (group === 'status') {
           arr = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled']
         }
         else if (group === 'priority') {
           arr = ['No Priority', 'Low', 'Medium', 'High', 'Urgent']
         }
         else {
           data?.users?.forEach((card) => {
             arr.push(card?.name)
           })
         }
         arr.forEach((groupName) => {
           groupData[groupName] = [];
         });
     
     
         if (group === 'user') {
           data?.tickets?.forEach((card) => {
             var key = card["userId"];
             data?.users.forEach((user) => {
               if (key === user["id"]) {
                 groupData[user["name"]].push(card);
     
               }
             })
           });
         }
         else {
           data?.tickets?.forEach((card) => {
             var key = card[group];
             if (group === "priority") {
               if (key === 0) key = 'No Priority'
               if (key === 1) key = 'Low'
               if (key === 2) key = 'Medium'
               if (key === 3) key = 'High'
               if (key === 4) key = 'Urgent'
             }
             groupData[key].push(card);
           })
         };
     
         setGroupedData(groupData)
       }
     
       const sortData = (sort) => {
         if (groupedData) {
           const sortedData = {};
           Object.keys(groupedData)?.forEach((group) => {
             const sortedGroup = groupedData[group].sort((a, b) => {
               if (sort === 'priority') {
                 return b.priority - a.priority;
               } else if (sort === 'title') {
                 return a.title.localeCompare(b.title);
               }
             })
             sortedData[group] = sortedGroup;
           });
           setSortedData(sortedData)
         }
       };
     

   const { Provider } = context
   return (
      <Provider value={{ theme,setTheme,data,setData,openAddData,setOpenAddData,openUpdate,setOpenUpdate ,groupBy, setGroupBy,sortBy, setSortBy,groupedData, setGroupedData,updateId,setUpdateId}}>
         {children}
      </Provider>
   )
}