import React from 'react';
import { useContext,useState,useEffect } from 'react';
import {postContext} from '../../store/PostContext'
import Heart from '../../assets/Heart';
import './Post.css';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../firebase/config';
import { Link } from 'react-router-dom';

function Posts() {
  const [products, setProducts] = useState([])
  const {setPostDetails}=useContext(postContext)
  useEffect(()=>{
    getDocs(collection(firestore,"products")).then((querySnapshot)=>{
      const allProducts=querySnapshot.docs.map((doc)=>({
        ...doc.data(),id:doc.id
      }))
      setProducts(allProducts)
    }).catch((error)=>{
      console.error("Error fetching Products!",error)
    })
  },[])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            products.map((product)=>{
              return (
                <Link to ={'/view'}>
                  <div
                    className="card" onClick={()=>{
                      setPostDetails(product)
                    }}
                    key={product.url}
                  >
                    <div className="favorite">
                      <Heart></Heart>
                    </div>
                    <div className="image">
                      <img src={product.url} alt="" />
                    </div>
                    <div className="content">
                      <p className="rate">&#x20B9; {product.price}</p>
                      <span className="kilometer"><strong>{product.name}</strong></span>
                      <p className="name">{product.category}</p>
                    </div>
                    <div className="date">
                      <span>{product.createdAt}</span>
                    </div>
                    
                  </div>
                </Link>

              )
            })
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {
            products.map((product)=>{
              return (
                <Link to={'/view'}>
                
                  <div
                    className="card"
                    onClick={()=>{
                      setPostDetails(product)
                    }}
                    key={product.url}
                  >
                    <div className="favorite">
                      <Heart></Heart>
                    </div>
                    <div className="image">
                      <img src={product.url} alt="" />
                    </div>
                    <div className="content">
                      <p className="rate">&#x20B9; {product.price}</p>
                      <span className="kilometer">{product.category}</span>
                      <p className="name">{product.name}</p>
                    </div>
                    <div className="date">
                      <span>{product.createdAt}</span>
                    </div>
                  </div>
                </Link>

              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Posts;
