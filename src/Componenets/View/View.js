import React, { useEffect, useState, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import FirebaseContext from '../../store/FirebaseContext';
import { PostContext } from '../../store/PostContext';
import './View.css';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (postDetails?.createdBy) {
        const userQuery = query(
          collection(db, 'users'),
          where('uid', '==', postDetails.createdBy)
        );
        const querySnapshot = await getDocs(userQuery);
        querySnapshot.forEach((doc) => setUserDetails(doc.data()));
      }
    };

    fetchUserDetails();
  }, [postDetails, db]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imageUrl }
          alt={postDetails.name }
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price }</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category }</p>
          <span>{new Date(postDetails.createdAt.seconds * 1000).toDateString() } </span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          {userDetails ? (
            <>
              <p>{userDetails.username || 'No name available'}</p>
              <p>{userDetails.phone || 'No phone number available'}</p>
            </>
          ) : (
            <p>Loading seller details...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default View;
