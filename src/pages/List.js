import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { projectFirestore } from '../firebase';

export default function List() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const getPostsFromFirebase = [];
        const subscriber = projectFirestore
          .collection("SUBMMITED_FORM")
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              getPostsFromFirebase.push({
                ...doc.data(), //spread operator
                key: doc.id, // `id` given to us by Firebase
              });
            });
            setPosts(getPostsFromFirebase);
          });
        return () => subscriber()
    }, [loading])

    console.log(posts.lastName)

    function saveKey(value){
      localStorage.setItem("submitted_form_currentID",value)
      navigate('/view-form')
      console.log(value)
    }
  return (
      <>
        <table>
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post)=>(
                <>
                <tr>
                    <td>{post.firstName}</td>
                    <td>{post.lastName}</td>
                    {post.status == "ACCEPTED" &&(
                      <td>ACCEPTED</td>
                    )}
                     {post.status == "REJECTED" &&(
                      <td>REJECTED</td>
                    )}
                       {post.status == "PENDING" &&(
                      <td>PENDING</td>
                    )}
                    <td>
                        <button onClick={() => {
                              saveKey(post.user_ID);
                            }}>VIEW</button>
                    </td>
                </tr>
                </>
                ))}

            </tbody>
        </table>
      </>
  )
}
