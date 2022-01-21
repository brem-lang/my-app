import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { projectFirestore } from '../firebase';
import UserService from '../services/User.service';

export default function UpdateProfile() {
    const[userName, setUserName] = useState();
    const[firstName,setFirsName] = useState()
    const[lastName,setLastName] = useState();
    const[contactNumber,setContactNumber] = useState()
    const[email,setEmail] = useState();
    const[password,setPassword] = useState();
    const{updateEmail,updatePassword} = useUserAuth()
    const [loading, setLoading] = useState(true);
    const currentUser = localStorage.getItem("currentUser")
    const[key,setKey] = useState()
    const navigate = useNavigate()
    

    async function handleSubmit(){
        try{
            await updateEmail(email);
            await updatePassword(password);
            UserService.update(userName,firstName,lastName,contactNumber,email,key);
            navigate('/home')
        }catch(error){
            console.log(error.message)
        }
    }

    useEffect(() => {
        const getPostsFromFirebase = [];
        const subscriber = projectFirestore
          .collection("USERS")
          .where('email','==',currentUser)
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

    return (
        <>
        <Container fluid="md">    
            <Link to='/home'>
                  <Button variant='link'>Cancel</Button>
            </Link>      
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={firstName} onChange={(e) => setFirsName(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"  onChange={(e) => setPassword(e.target.value)} required/>
                </Form.Group>
                <Button variant="primary" type="submit"  onClick={handleSubmit}>
                    Login
                </Button> 
            </Form>
        </Container>
            {/* <input type="text" placeholder='type ur username' value={userName} onChange={(e) => setUserName(e.target.value)} required/>
            <input type="email" placeholder='type ur email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type="text" placeholder='type ur first name' value={firstName} onChange={(e) => setFirsName(e.target.value)} required/>
            <input type="text" placeholder='type ur last name' value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
            <input type="number" placeholder='type ur contact number' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required/>
            <input type="password" placeholder='type ur password' onChange={(e) => setPassword(e.target.value)} required/>
            <button onClick={handleSubmit}>update</button> */}
        </>
    )
}
