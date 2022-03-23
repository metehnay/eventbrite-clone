import React from 'react'

// Random Background 

const randomImg = ["bg1", "bg2", "bg3"]

const getRandomImg = randomImg[Math.floor(Math.random() * randomImg.length)]

const RightContainer = () => {


  return (
            <div className="right-container">
                  <div id="img-box" className={`${getRandomImg}`} >
                  </div>
              </div>
  )
}

export default RightContainer