import { Modal, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import { MdEdit, MdDelete } from "react-icons/md";

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const { token, details: user } = useSelector(state => state.user)
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const deleteListing = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/listing/delete/${listing._id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token,
        },
      })
      setLoading(false);

      if (res.ok) {
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getListingDetails = async () => {
      try {
        const res = await fetch(`/api/listing/${id}`);
        const data = await res.json();

        if (res.ok) setListing(data)
      } catch (error) {
        console.log(error);
      }
    }

    getListingDetails();
  }, [id])

  if (!listing) return <div className='flex justify-center m-5'><Spinner size="xl" /></div>

  return (
    <main className="details-paper">
      {
        user._id === listing.owner ?
        <div className='flex justify-end items-center w-full'>
          <Link to={`/listing/update/${listing._id}`} className='card-btn'><MdEdit fontSize={24} /></Link>
          <button className='card-btn' onClick={() => setConfirmDelete(true)}> <MdDelete fontSize={24} /></button>

          <Modal popup show={confirmDelete} onClose={() => setConfirmDelete(false)}>
            <div className="modal-container">
              <Modal.Header />
              <Modal.Body className='modal-body'>
                <h1 className='text-xl mb-8 text-center'>
                  Are you sure you want to delete
                  <span className="text-blue-600 dark:text-blue-500 font-semibold px-2" >{listing.title}</span>
                  listing ?
                </h1>
                {
                  loading ? <Spinner />
                    :
                    <div className='flex gap-2 w-full'>
                      <button className='delete w-full' onClick={deleteListing}>Confirm Delete</button>
                      <button className='cancel w-full' onClick={() => setConfirmDelete(false)}>Cancel</button>
                    </div>
                }
              </Modal.Body>
            </div>
          </Modal>
        </div> : <div className="pt-4" />
      }
      <h1 className="text-2xl text-blue-600 dark:text-blue-500 font-semibold">{listing.title}</h1>
    </main>
  )
}

export default ListingDetails