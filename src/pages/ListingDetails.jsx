import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
      const getListingDetails = async () => {
          try {
              const res = await fetch(`/api/listing/${id}`);
              const data = await res.json();

              if(res.ok) setListing(data)
          } catch (error) {
              console.log(error);
          }
      }

      getListingDetails();
  }, [id])

  if(!listing) return <div className='flex justify-center m-5'><Spinner size="xl" /></div>

  return (
    <main className="form-paper">{listing.title}</main>
  )
}

export default ListingDetails