import React ,{useContext}from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
function Header() {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();
    const handleLogout = async ()=>{
        try{
            await signOut(auth)
            navigate('/login')
        }catch(error){
            console.error('Error signing out: ',error)
        }
    }
    const handleLoginClick = () => {
        navigate('/login');
    };
    const handleSellClick = ()=>{
      navigate('/create')
    }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user?(
            <span><b>Welcome</b> <b>{user.displayName}</b></span>
          ):(
            <span onClick={handleLoginClick}  style={{cursor:'pointer'}}>Login</span>
          )

          }
          <hr />
        </div>
       {user && <span onClick={handleLogout} style={{cursor:'pointer'}}><b>Logout</b></span>} 
      
        <div onClick={handleSellClick} style={{cursor:'pointer'}}className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
           <span >SELL</span> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;