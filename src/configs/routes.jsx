import MainContainer from './../components/MainContainer';
import Signup from './../components/SignUp';
const eventbriteRoutes = [
    {
       path: "/",
      element: <MainContainer />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ];
  
  export { eventbriteRoutes };