import React from 'react'

import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer'

interface props {
  loginPage: boolean;
  setLoginPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainContainer: React.FC<props>= ({loginPage, setLoginPage}) => {

  return (

    //  Homepage Container

         <section className="main-container">
            
<LeftContainer loginPage={loginPage} setLoginPage={setLoginPage} />
<RightContainer />
          
         </section>
      
  )
}

export default MainContainer