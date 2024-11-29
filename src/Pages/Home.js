import React from 'react'
import Banner from '../Componenets/Banner/Banner'
import Header from '../Componenets/Header/Header'
import Posts from '../Componenets/Posts/Posts'
import Footer from '../Componenets/Footer/Footer'

function Home() {
  return (
    <div className='homeParentDiv'>
      <Header/>
      <Banner/>
      <Posts/>
      <Footer/>
    </div>
  )
}

export default Home
