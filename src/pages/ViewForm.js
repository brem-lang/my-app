import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectFirestore } from '../firebase';
import FormService from '../services/Form.service';


export default function ViewForm() {

    const[userName, setUserName] = useState();
    const[firstName,setFirsName] = useState()
    const[lastName,setLastName] = useState();
    const[contactNumber,setContactNumber] = useState()
    const[email,setEmail] = useState();
    const [loading, setLoading] = useState(true);
    const submitted_form_currentID = localStorage.getItem("submitted_form_currentID")
    const[key,setKey] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const getPostsFromFirebase = [];
        const subscriber = projectFirestore
          .collection("SUBMMITED_FORM")
          .where("user_ID",'==',submitted_form_currentID)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              getPostsFromFirebase.push({
                ...doc.data(), //spread operator
                key: doc.id, // `id` given to us by Firebase
              });
              setUserName(doc.data().userName)
              setEmail(doc.data().email)
              setFirsName(doc.data().firstName)
              setLastName(doc.data().lastName)
              setContactNumber(doc.data().contactNumber)
              setKey(doc.id)
            });
            
          });
        return () => subscriber()
    }, [loading])

    async function acceptform(){
        await FormService.acceptform(key);
        navigate('/list')
    }

    async function rejectform(){
        await FormService.rejectform(key);
        navigate('/list')
    }


  return (
      <>
            <input type="text" placeholder='type ur username' value={userName} onChange={(e) => setUserName(e.target.value)} required/>
            <input type="email" placeholder='type ur email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type="text" placeholder='type ur first name' value={firstName} onChange={(e) => setFirsName(e.target.value)} required/>
            <input type="text" placeholder='type ur last name' value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
            <input type="number" placeholder='type ur contact number' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required/>
            <button onClick={acceptform}>ACCEPT</button>
            <button onClick={rejectform}>REJECT</button>
      </>
  )
}
