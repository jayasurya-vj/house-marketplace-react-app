import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { collection, getDoc, where, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore'
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'



function Offers() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)



  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingsRef = collection(db, 'listings')
        const q = query(listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10))

        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible);
        const listings = [];
        querySnap.forEach(doc => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setListing(listings)
        setLoading(false)


      } catch (error) {
        console.log(error)
        setLoading(false)
        toast.error("Cannot fetch Listing")

      }
    }

    fetchListing()
  }, [])
  const onFetchMoreListings = async () => {
    try {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10))

      const querySnap = await getDocs(q);
      const listings = [];
      querySnap.forEach(doc => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setListing((prevState) => [...prevState, ...listings])
      setLoading(false)


    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error("Cannot fetch Listing")

    }
  }

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>
          Offers
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listing && listing.length > 0 ? (
        <>

          <main>
            <ul className='categoryListings'>
              {listing.map((l) => (

                <ListingItem
                  listing={l.data}
                  id={l.id}
                  key={l.id}
                />
              ))}
            </ul>
          </main>

          {lastFetchedListing && (
            <p className='loadMore' onClick={onFetchMoreListings}>
              Load More
            </p>
          )}



        </>
      ) : (
        <p>No listings with offers</p>
      )}
    </div>
  )
}

export default Offers