import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import FormService from '../services/Form.service';

export default function Form() {


  const[userName, setUserName] = useState();
  const[firstName,setFirsName] = useState()
  const[lastName,setLastName] = useState();
  const[contactNumber,setContactNumber] = useState()
  const[email,setEmail] = useState();
  const navigate = useNavigate()
  const {currentUser} = useUserAuth()

  async function handleSubmit(){

    const data = {
      email:email,
      userName:userName,
      firstName:firstName,
      lastName:lastName,
      contactNumber:contactNumber,
      status:"PENDING",
      user_ID : currentUser.uid,
    }
    await FormService.create(data);
    navigate('/home')
  }

  return (
      <>
        <input type="text" placeholder='type ur username'  onChange={(e) => setUserName(e.target.value)} required/>
        <input type="email" placeholder='type ur email'  onChange={(e) => setEmail(e.target.value)} required/>
        <input type="text" placeholder='type ur first name'  onChange={(e) => setFirsName(e.target.value)} required/>
        <input type="text" placeholder='type ur last name'  onChange={(e) => setLastName(e.target.value)} required/>
        <input type="number" placeholder='type ur contact number'  onChange={(e) => setContactNumber(e.target.value)} required/>
        <button onClick={handleSubmit}>Submit</button>
      </>
  )
}
