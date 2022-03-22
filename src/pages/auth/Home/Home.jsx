import React from 'react'
import Header from './Header'
import { EventItems } from './../../../components/EventItems';

const Home = () => {
  return (
    <>
    <div className="home-container">
      <div className="home-top-container">
        <div className="background-image"></div>
      <div className="home-bottom">
        <div className="button-container">
          <button className="home-btn">Find your next event</button></div>
      </div></div></div>
      <EventItems />
      </>
  )
}

export default Home