
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import {Link, useNavigate } from "react-router-dom";
import { useUserAuth } from '../context/UserAuthContext';
import logo from '../images/logo.png'

export default function Login() {
    const[email,setEmail] = useState();
    const[password,setPassword] = useState();
    
    const {login } = useUserAuth();
    const navigate = useNavigate()

    localStorage.clear();

    async function handleSubmit(e){
        e.preventDefault();

        try{
            await login(email,password);
            navigate("/home");
        }catch(error){
            console.log(error.message)
        }
        console.log(email)
        console.log(password)
    }

    return (
        <>


        <Container fluid="md">
            
            <Row className="justify-content-md-center">
                <img src={logo} style={{height:'200px',width:'250px'}} ></img>
            </Row>           
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
                </Form.Group>
                <Button variant="primary" type="submit"  onClick={handleSubmit}>
                    Login
                </Button>{' '}
                <Link to="/signup">Signup</Link>
            </Form>
        </Container>

            
            {/* <input type="email" placeholder='type ur email'  onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='type ur password' onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleSubmit}>login</button>
            <Link to="/signup">Signup</Link> */}
        </>

    )
}
