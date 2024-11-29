import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login';
import CreatePage from './Pages/Create';
import { AuthProvider } from './store/AuthContext';
import FirebaseContext from './store/FirebaseContext';
import {auth, db, storage } from './firebase/config';
import ViewPost from './Pages/ViewPost';
import PostProvider from './store/PostContext';  // This import is correct now

function App() {
  return (
    <div className="App">
      <PostProvider>
        <AuthProvider>
          <FirebaseContext.Provider value={{ auth,db, storage }}>
            <Router>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/create' element={<CreatePage />} />
                <Route path='/view' element={<ViewPost />} />
              </Routes>
            </Router>
          </FirebaseContext.Provider>
        </AuthProvider>
      </PostProvider>
    </div>  
  );
}

export default App;
