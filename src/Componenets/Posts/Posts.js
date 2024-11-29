import React, { useEffect, useContext, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import FirebaseContext from '../../store/FirebaseContext';
import image from '../../assets/Images/R15V3.jpg';
import { collection, getDocs } from 'firebase/firestore';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
    const { db } = useContext(FirebaseContext);
    const [products, setProducts] = useState([]);
    const { setPostDetails } = useContext(PostContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, 'products'); 
                const productsSnapshot = await getDocs(productsCollection);
                const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
                setProducts(productsList);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
    
        fetchProducts(); 
    }, [db]);

    const handleCardClick = (product) => {
        setPostDetails(product); // Set the single product
        navigate('/view');
    };

    return (
        <div className="postParentDiv">
            <div className="moreView">
                <div className="heading">
                    <span>Quick Menu</span>
                    <span>View more</span>
                </div>
                <div className="cards">
                    {products.map(product => (
                        <div 
                            className="card" 
                            key={product.id} 
                            onClick={() => handleCardClick(product)} // Set individual product
                        >
                            <div className="favorite">
                                <Heart />
                            </div>
                            <div className="image">
                                <img src={product.imageUrl} alt={product.name} />
                            </div>
                            <div className="content">
                                <p className="rate">&#x20B9; {product.price}</p>
                                <span className="kilometer">{product.category}</span>
                                <p className="name">{product.name}</p>
                            </div>
                            <div className="date">
                                <span>{new Date(product.createdAt.seconds * 1000).toDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="recommendations">
                <div className="heading">
                    <span>Fresh recommendations</span>
                </div>
                <div className="cards">
                    <div className="card">
                        <div className="favorite">
                            <Heart />
                        </div>
                        <div className="image">
                            <img src={image} alt="" />
                        </div>
                        <div className="content">
                            <p className="rate">&#x20B9; 250000</p>
                            <span className="kilometer">Two Wheeler</span>
                            <p className="name">YAMAHA R15V3</p>
                        </div>
                        <div className="date">
                            <span>10/5/2021</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posts;
