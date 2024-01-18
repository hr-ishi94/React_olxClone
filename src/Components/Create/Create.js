import React, { Fragment, useContext, useState  } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { firestore,storage } from '../../firebase/config';
import { Authcontext } from '../../store/Context';
import {ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage' 
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState()

  const {user}=useContext(Authcontext)
  const navigate=useNavigate()

  const submitHandler=()=>{
    if (!name ||!category|| !price){
      alert ('Enter required fields!')
      return
    }
    if (!user){
      alert('Please login to your account!')
      return
    }
    if (!image){
      alert('Please upload an image!')
      return
    }

    const storageRef=ref(storage,`/images/${image.name}`)
    const uploadTask= uploadBytesResumable(storageRef,image)

    uploadTask.on(
      "state_changed",
      (snapshot)=>{
        console.log(snapshot)
      },(error)=>{
        alert('Error uploading image: '+error.message)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref)
         .then((url)=>{

          const productsCollection=collection(firestore,"products")
          addDoc(productsCollection,{
            name,
            category,
            price,
            url,
            userId:user.uid,
            createdAt: new Date().toDateString()
          })
          .then(()=>{
            navigate("/")
          })
          .catch((error)=>{
            alert('Error adding product to firestore'+error.message)
          })
        })
        .catch((error)=>{
          alert('Error getting download url:'+error.message)
        })
      }
    )
  }


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            defaultValue="John"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            defaultValue="John"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input className="input" type="number" id="fname" name="Price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
          <br />
        
        <br />
        <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf9W-4C8o3gRqwN270j6o_BoQCDeOLUOtyWZ0PisH2l2Z_Z6YDyoHUjzhYft5bkdkEirg&usqp=CAU'}></img>
        
          <br />
          <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
          <br />
          <button onClick={submitHandler} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
