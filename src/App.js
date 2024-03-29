import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import Navbar from './components/Navbar';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import PrivateRouter from "./components/PrivateRouter"
import Category from './pages/Category'
import Contact from './pages/Contact'
import Listing from './pages/Listing'


function App() {
  return (
    <>
   <Router>
      <Routes>
        <Route path='/' element={ <Explore/>} />
        <Route path='/offers' element={ <Offers/>} />
        <Route path='/category/:categoryName' element={ <Category/>} />
        <Route path='/category/:categoryName/:listingId' element={ <Listing/>} />
        <Route path='/contact/:landlordId' element={ <Contact/>} />
        <Route path='/profile' element={ <PrivateRouter/>} >
          <Route path='/profile' element={ <Profile/>} />
        </Route>
        <Route path='/sign-in' element={ <SignIn/>} />
        <Route path='/sign-up' element={ <SignUp/>} />
        <Route path='/forgot-password' element={ <ForgotPassword/>} />   
        <Route path='/create-listing' element={ <CreateListing/>} />   
        <Route path='/edit-listing/:listingId' element={ <EditListing/>} />        
      </Routes>
      <Navbar />
    </Router>

    <ToastContainer />
    </>
  );
}

export default App;
