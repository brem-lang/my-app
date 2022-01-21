import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import UserService from '../services/User.service';


export default function Signup() {
    const[userName, setUserName] = useState();
    const[firstName,setFirsName] = useState()
    const[lastName,setLastName] = useState();
    const[contactNumber,setContactNumber] = useState()
    const[email,setEmail] = useState();
    const[password,setPassword] = useState();
    const[password1,setPassword1] = useState();
    const { signup } = useUserAuth();
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault();
        try{
            if(password!= password1){
                alert("password did not match")
            }else{

                const data ={
                    email:email,
                    userName:userName,
                    firstName:firstName,
                    lastName:lastName,
                    contactNumber:contactNumber,
                    type:"MEMBER",
                }
                await signup(email,password);
                UserService.create(data)
                navigate("/home")
            }
        }catch(error){
            console.log(error)
        }
    }

    return (
        <>
            <Container fluid="md">      
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" onChange={(e) => setUserName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" onChange={(e) => setFirsName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" onChange={(e) => setLastName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="number" onChange={(e) => setContactNumber(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"  onChange={(e) => setPassword(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Retype Password</Form.Label>
                        <Form.Control type="password"  onChange={(e) => setPassword1(e.target.value)} required/>
                    </Form.Group>
                    <Button variant="primary" type="submit"  onClick={handleSubmit}>
                        Signup
                    </Button> 
                </Form>
            </Container>
         {/* <input type="text" placeholder='type ur username'  onChange={(e) => setUserName(e.target.value)} required/>
        <input type="email" placeholder='type ur email'  onChange={(e) => setEmail(e.target.value)} required/>
        <input type="text" placeholder='type ur first name'  onChange={(e) => setFirsName(e.target.value)} required/>
        <input type="text" placeholder='type ur last name'  onChange={(e) => setLastName(e.target.value)} required/>
        <input type="number" placeholder='type ur contact number'  onChange={(e) => setContactNumber(e.target.value)} required/>
        <input type="password" placeholder='type ur password' onChange={(e) => setPassword(e.target.value)} required/>
        <input type="password" placeholder='retype ur password' onChange={(e) => setPassword1(e.target.value)} required/>
        <button onClick={handleSubmit}>login</button> */}
    </>
    )
}
