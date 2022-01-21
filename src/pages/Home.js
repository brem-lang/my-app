import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../context/UserAuthContext'
import {Link, useNavigate } from "react-router-dom";
import { projectFirestore } from '../firebase';
import UserService from '../services/User.service';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../images/logo.png'

export default function Home() {
    const {currentUser,logout} = useUserAuth()
    const navigate = useNavigate()
    const [posts, setPosts] = useState([]);
    const [notif, setNotif] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUserRole = localStorage.getItem("currentUserRole")

    async function handleLogout(){
        try{
            await logout()
            navigate("/")
        }catch(error){
            console.log(error)
        }
    }

    localStorage.setItem('currentUser',currentUser.email)
    localStorage.removeItem("submitted_form_currentID")
    useEffect(() => {
        UserService.userRole(currentUser.email)
        const getPostsFromFirebase = [];
        const subscriber = projectFirestore
          .collection("USERS")
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              getPostsFromFirebase.push({
                ...doc.data(), //spread operator
                key: doc.id, // `id` given to us by Firebase
              });
            });
            setPosts(getPostsFromFirebase);
          });

          const uid = currentUser.uid
          const getPostsFromFirebase1 = [];
          const subscriber1 = projectFirestore
            .collection("SUBMMITED_FORM")
            .where("user_ID",'==',uid)
            .onSnapshot((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                getPostsFromFirebase1.push({
                  ...doc.data(), //spread operator
                  key: doc.id, // `id` given to us by Firebase
                });
              });
              setNotif(getPostsFromFirebase1);
            });

          
        return () => subscriber()
    }, [loading])

    console.log(notif)


    return (
        <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/home">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            </Navbar.Brand>
            <Nav className="me-auto">
              {currentUserRole=="ADMIN"&&(
                 <Nav.Link href="/list">List of Applicant</Nav.Link>
              )}
              {currentUserRole=="MEMBER"&&(
                 <Nav.Link href="/form">Submit Form</Nav.Link>
              )}
             
            </Nav>
            <Navbar.Toggle />
              <NavDropdown title={currentUser.email} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/updateProfile">Update Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Button variant='link' onClick={handleLogout}>Logout</Button>
                </NavDropdown.Item>
              </NavDropdown>
          </Container>
        </Navbar>
        <Container>
        </Container>
        {/* <div>
            <h1>
                WELCOME HOMEPAGE
                <br></br>
                <a>{currentUser.email}</a>
            </h1>
            <button onClick={handleLogout}>logOut</button>
            <button>
               <Link to="/updateProfile">UPDATE PROFILE</Link> 
            </button>    
            <br></br>
            {currentUserRole == "ADMIN" && (
                <button>
                    <Link to="/list">LIST OF APPLICANT</Link> 
                </button>    
            )}
              {currentUserRole == "MEMBER" && (
                  <>
                    <button>
                        <Link to="/form">SUBMIT FORM</Link> 
                    </button>    

                    <h1>NOTIFICATIONS</h1>
                    {notif.map((post)=>(
                       <p>Your form is {post.status}</p>
                    ))}
         
                  </>
            )}

        </div> */}
        </>      
    )
}
