import "./App.css"
import React, { useEffect, useState } from 'react'
import Fab from '@mui/material/Fab';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const API = "http://localhost:3000/data"
 
 const App = () => {
  const [data , setData ] = useState([])
  const [editName , setEditName] = useState('')
  const [editStatus , setEditStatus] = useState('')
  const [idx , setIdx ] = useState('')
  const [addName , setName] = useState('')
  const [addStatus , setStatus] = ('')
  async function get(){
    try {
      const res = await fetch(API)
      const data = await res.json()
      setData(data)

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=> {
    get()
  } , [] )
  async function funDelete(id) {
    try {
      await fetch(`${API}/${id}` , {
        method : "DELETE"
      })
      get()
    } catch (error) {
      console.error(error);
    }
  }
  async function editFun() {
    try {
      let editUser = {
        id : idx ,
        name : editName ,
        status : editStatus
      }
      await fetch(`${API}/${idx}` , {
        method : "PUT" ,
        headers : {"Content-Type":"application/json"} ,
        body : JSON.stringify(editUser)
      })
      get()
      setIdx('')
      setEditName('')
      setEditStatus('true')
    } catch (error) {
      console.error(error);
    }
  }
  async function funCheck(ele) {
    try {
      let sta = {
        ...ele ,
        status : !ele.status
      }
      await fetch(`${API}/${ele.id}` , {
        method : "PUT" ,
        headers : {"Content-type":"application/json"} ,
        body : JSON.stringify(sta)
      })
      get()
    } catch (error) {
      console.error(error);
    }
  }
  async function funAdd() {
    try {
      let newUser = {
        id : `${Date.now()}` ,
        name : addName ,
        status : addStatus
      }
      await fetch(API , {
        method : "POST" ,
        headers : {"Content-type":"application/json"} ,
        body : JSON.stringify(newUser)
      })
      get()
      setName('')
      setStatus('')
    } catch (error) {
      console.error(error);
    }
  }
   return (
     <div className="allDiv"> 
          <TextField value={editName} onChange={(e)=> setEditName(e.target.value)} id="standard-basic" label="Edit" variant="standard" />
          <select value={editStatus} onChange={(e)=> setEditStatus(e.target.value == "true" ? true : false)} className="inpEdit">
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        <Fab onClick={editFun} size="small" color="secondary" aria-label="add" sx={{backgroundColor : "gray"}}>+</Fab>

      {/* /////////////////////////////// */}

        <div>
        <TextField value={addName} onChange={(e)=> setName(e.target.value)} id="standard-basic" label="Add Name" variant="standard" />
          <select value={addStatus} onChange={(e)=> setStatus(e.target.value == "true" ? true : false)} className="inpEdit">
            <option value="false">Inactive</option>
            <option value="true">Active</option>
          </select>
        <Fab onClick={funAdd} size="small" color="secondary" aria-label="add" sx={{backgroundColor : "green"}}>+</Fab>
        </div>
      <div className="forBox">
      {data.map((e)=> {
        return (<div key={e.id} className="box">
          <h1>{e.name}</h1>
          <Checkbox {...label} checked={e.status} onClick={()=> funCheck(e)}/>
          <Tooltip title="Delete" onClick={()=> funDelete(e.id)}>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
    <Fab onClick={()=> {
      setEditName(e.name)
      setEditStatus(e.status)
      setIdx(e.id)
    }} size="small" color="secondary" aria-label="add" sx={{backgroundColor : "gray"}}>+</Fab>
      </div>)
      })}
      </div>
     </div>
   )
 }
 
 export default App