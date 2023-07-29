import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom'
import { collection, getDocs, query, orderBy, where, deleteDoc } from 'firebase/firestore'
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import {app,db} from '../firebase.config' 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import Spinner from '../components/Spinner'


function Profile() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const auth = getAuth(app);
  const [formData,setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
  const {name,email}=formData;  
  const [changeDetails, setChangeDetails] = useState(false)
  const navigate = useNavigate();
 
  const onLogout=()=>{
    auth.signOut();
    navigate('/')
  }

  const onSubmit=async ()=>{

    try{
      if(auth.currentUser.displayName!==name){
        await updateProfile(auth.currentUser,{
          displayName:name
        })
      }

      const userRef=doc(db,"users",auth.currentUser.uid)
      await updateDoc(userRef,{name,})

    }catch(error){
      console.log(error);
      toast.error("could not update profile details")
    }

  }

  const onChange=(e)=>{
    setFormData((prevState)=>{
      return {
      ...prevState,
      [e.target.id] : e.target.value
    }})
  }
  
  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, 
        where('userRef','==',auth.currentUser.uid),
        orderBy('timestamp', 'desc'))
      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListing(listings)
      setLoading(false)
    }

    fetchListings()
  }, [auth.currentUser.uid])
  

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listing.filter(
        (listing) => listing.id !== listingId
      )
      setListing(updatedListings)
      toast.success('Successfully deleted listing')
    }
  }

  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)

  

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => { 
              changeDetails && onSubmit()
              setChangeDetails((prevState)=>!prevState)
            }}> {!changeDetails && 'change' || 'done'}</p>
        </div>
        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type='email'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt='home' />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt='arrow right' />
        </Link>
        { loading && <Spinner />}
        {!loading && listing?.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
              {listing.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>

  
    </div>
  )
}

export default Profile