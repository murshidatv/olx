// store/FirebaseContext.js
import React, { createContext } from 'react';
import { auth, db, storage } from '../firebase/config'; 

const FirebaseContext = createContext({ auth, db, storage });

export default FirebaseContext;
