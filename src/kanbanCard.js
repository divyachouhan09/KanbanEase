// KanbanCard.js
import React, { useContext, useEffect, useState } from 'react';
import { context } from './Context';
import UpdateData from './UpdateData';

const KanbanCard = ({ card }) => {
   const { theme , data,openUpdate,setOpenUpdate,updateId,setUpdateId} = useContext(context)
   const [name,setName] = useState("user name")
   

   useEffect(()=>{
      setName(data?.users?.filter(usr => usr.id == card.userId)?.[0].name)
   },[])
   
   const openUpdateHandle = () =>{
      setOpenUpdate(true)
      setUpdateId(card.id)
   }
   
   return (
      <div onClick={openUpdateHandle} className={`${theme ? "bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]" : "bg-gray-700 shadow-[rgba(_255,_255,_255,_0.04)_0px_3px_8px]"} rounded-md w-full p-4  border-[#e6e7eb]  flex flex-col gap-3`}>
         <div className='flex justify-between'>
            <div className='text-base text-[#8D8D8D] font-sans'>{card.id}</div>
            {/* <div className='bg-red-600 p-2 rounded-full' >{card.name[0]}{card.name.split(" ")[1][0]}</div> */}
            <div className='bg-red-600 p-2 text-white rounded-full text-[8px] text-center flex justify-center items-center ' >{name?.[0].toUpperCase()}{name?.split(" ")?.[1]?.[0].toUpperCase()}</div>

         </div>
            <div>{name}</div>
         <div className='flex gap-2'>
            {card.status === "In progress" &&
               <svg className='text-yellow-500' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" ><path d="M12 2h-1v9H2v1a10 10 0 0 0 17.07 7.07A10 10 0 0 0 12 2z"></path></svg>
               // <svg  stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" ><path d="M12 2h-1v9H2v1a10 10 0 0 0 17.07 7.07A10 10 0 0 0 12 2z"></path></svg>
            }{card.status === "Todo" && <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path></svg>}
            {card.status === "Backlog" && <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" ><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7.5 4.21l0 .01"></path><path d="M4.21 7.5l0 .01"></path><path d="M3 12l0 .01"></path><path d="M4.21 16.5l0 .01"></path><path d="M7.5 19.79l0 .01"></path><path d="M12 21l0 .01"></path><path d="M16.5 19.79l0 .01"></path><path d="M19.79 16.5l0 .01"></path><path d="M21 12l0 .01"></path><path d="M19.79 7.5l0 .01"></path><path d="M16.5 4.21l0 .01"></path><path d="M12 3l0 .01"></path></svg>}
            {card.status === "Cancelled" &&
               <svg className='text-white' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm8.036-4.024a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042L10.939 12l-2.963 2.963a.749.749 0 0 0 .326 1.275.749.749 0 0 0 .734-.215L12 13.06l2.963 2.964a.75.75 0 0 0 1.061-1.06L13.061 12l2.963-2.964a.749.749 0 0 0-.326-1.275.749.749 0 0 0-.734.215L12 10.939Z"></path></svg>}
            {card.status === "Done" && <svg className='text-blue-500' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" ><path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm16.28-2.72a.751.751 0 0 0-.018-1.042.751.751 0 0 0-1.042-.018l-5.97 5.97-2.47-2.47a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042l3 3a.75.75 0 0 0 1.06 0Z"></path></svg>}
            <div className={`text-base font-medium text-[#373737] font-sans leading-[102%]  ${theme ? " text-black" : "text-white"}`}>{card.title}</div>
         </div>
         <div className='flex gap-2'>
            <div className={`border-[1px] flex w-fit border-gray-600 p-1 rounded-[8px] ${theme ? " text-black" : "text-white"}`}>
               {card.priority === 4 &&
                  <svg className='text-orange-500' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" ><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg>
               }{card.priority === 1 &&
                  <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" ><path d="M2 20h.01"></path><path d="M7 20v-4"></path></svg>}
               {card.priority === 3 &&
                  <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" ><path d="M2 20h.01"></path><path d="M7 20v-4"></path><path d="M12 20v-8"></path><path d="M17 20V8"></path></svg>}
               {card.priority === 2 &&
                  <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" ><path d="M2 20h.01"></path><path d="M7 20v-4"></path><path d="M12 20v-8"></path></svg>}
               {card.priority === 0 &&
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" ><path d="M112 476h160v72H112zm320 0h160v72H432zm320 0h160v72H752z"></path></svg>}
            </div>
            <div>
               {card.tag.map((tag) => (
                  <div>{tag}</div>
               ))}
            </div>
         </div>
         {openUpdate && <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'><UpdateData /></div>}
    
      </div>
   );
};

export default KanbanCard;
