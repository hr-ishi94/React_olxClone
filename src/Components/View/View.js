import React, { useContext, useEffect, useState } from 'react';
import { postContext } from '../../store/PostContext';
import { firestore } from '../../firebase/config';
import { collection, getDocs, query ,where} from 'firebase/firestore';

import './View.css'
function View() {
  const { postDetails } = useContext(postContext);
  const [sellerDetails, setSellerDetails] = useState();

  useEffect(() => {
    const { userId } = postDetails;
    const myCollection = collection(firestore, "users");
    getDocs(query(myCollection, where("id", "==", userId)))
      .then((res) => {
        res.forEach((doc) => {
          setSellerDetails(doc.data());
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="Product Image" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          
          <p style={{fontWeight:'800',fontSize:'25px'}}>{postDetails.name}</p>
          
          <p style={{fontWeight:'800'}}>{postDetails.category}</p>
          <span style={{fontWeight:'800'}}>{postDetails.createdAt}</span>
        </div>
        {sellerDetails && 
          <div className="contactDetails">
            <p style={{fontWeight:'800'}}>Seller Details</p>
            
            <p style={{fontWeight:'800'}}>{sellerDetails.username}</p>
            <p style={{fontWeight:'800'}}>{sellerDetails.mobilenumber}</p>
          </div>
        }
      </div>
    </div>
  );
}
export default View;