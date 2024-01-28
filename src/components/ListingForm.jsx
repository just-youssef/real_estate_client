import { Spinner } from "flowbite-react";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { MdErrorOutline, MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const ListingForm = ({ listing }) => {
  const token = useSelector((state) => state.user.token);

  const [formData, setFormData] = useState({ imageUrls: [] });
  const [formDataError, setFormDataError] = useState({});
  const [loading, setLoading] = useState(false);
  // console.log(formData);

  const uploadToGallery = async (e) => {
    setFormDataError({ ...formDataError, imageUrls: "" })
    const imagesArray = e.target.files

    if (imagesArray.length == 0) {
      console.log("no images selected");
      return;
    }

    if (imagesArray.length + formData.imageUrls.length > 4) {
      setFormDataError({ ...formDataError, imageUrls: "You can upload up to max 4 images for gallery" })
      e.target.value = null;
      return;
    }

    for(let image of imagesArray){
      if(image.type.split("/")[0] !== "image"){
        setFormDataError({ ...formDataError, imageUrls: "You can only upload image types" })
        e.target.value = null;
        return;
      }
    }

    setLoading(true);
    const imageArrayData = new FormData();
    Object.keys(imagesArray).forEach(key => imageArrayData.append('files', imagesArray[key]))

    try {
      const res = await fetch(`/api/cloudinary/uploadMultiple`, {
        method: "POST",
        headers: {
          "x-auth-token": token
        },
        body: imageArrayData
      })
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setFormData({ ...formData, imageUrls: formData.imageUrls.concat(data.urls) })
        e.target.value = null
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.imageUrls == 0) {
      setFormDataError({ ...formDataError, imageUrls: "Must upload at least 1 image for gallery" })
      return;
    }
  }

  const deleteImage = (toDel) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter(url => url != toDel)
    })
  }

  return (
    <main className='form-paper'>
      <h1 className='font-semibold text-3xl text-center mb-6'>
        {listing ? <><span className='text-gray-500'>Update</span> Listing</> : <>Create <span className='text-gray-500'> New</span> Listing</>}
      </h1>
      <form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2 w-full'>
          {/* text inputs */}
          <input required placeholder='Name *' id='name' className="input-box" onChange={handleChange} />
          <textarea required placeholder='Description *' id='description' className="input-box" onChange={handleChange} />
          <input required placeholder='Address *' id='address' className="input-box" onChange={handleChange} />

          {/* bool inputs */}
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5'>
            {/* sell */}
            <div className='flex items-center'>
              <input type="checkbox" className="checkbox" id='sell' onChange={(e) => console.log(e.target.value)} />
              <label htmlFor="sell" className="pl-1">Sell</label>
            </div>
            {/* rent */}
            <div className='flex items-center'>
              <input type="checkbox" className="checkbox" id='rent' />
              <label htmlFor="rent" className="pl-1">Rent</label>
            </div>
            {/* furnished */}
            <div className='flex items-center'>
              <input type="checkbox" className="checkbox" id='furnished' />
              <label htmlFor="furnished" className="pl-1">Furnished</label>
            </div>
            {/* parking */}
            <div className='flex items-center'>
              <input type="checkbox" className="checkbox" id='parking' />
              <label htmlFor="parking" className="pl-1">Parking</label>
            </div>
            {/* offer */}
            <div className='flex items-center'>
              <input type="checkbox" className="checkbox" id='offer' />
              <label htmlFor="offer" className="pl-1">Offer</label>
            </div>
          </div>

          {/* numerical inputs */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {/* number of bedrooms */}
              <div className='flex flex-col w-full'>
                <label htmlFor="bedrooms">Bedrooms *</label>
                <input required placeholder="Number of bedrooms" type="number" className="input-box w-full" id='bedrooms' min={1} max={10} onChange={handleChange} />
              </div>

              {/* number of bathrooms */}
              <div className='flex flex-col w-full'>
                <label htmlFor="bathrooms">Bathrooms *</label>
                <input required placeholder="Number of bathrooms" type="number" className="input-box w-full" id='bathrooms' min={1} max={10} onChange={handleChange} />
              </div>
            </div>

            {/* regular price */}
            <div className='flex flex-col'>
              <label htmlFor="regularPrice">
                Regular Price
                <span className="text-sm text-gray-500 px-1">(EGP/Month)</span>
                *
              </label>
              <input required placeholder="Regular price" type="number" className="input-box w-full" id='regularPrice' onChange={handleChange} />
            </div>

            {/* discount price */}
            <div className='flex flex-col'>
              <label htmlFor="discountPrice">
                Discounted Price
                <span className="text-sm text-gray-500 px-1">(EGP/Month)</span>
                *
              </label>
              <input required placeholder="Price after discount" type="number" className="input-box w-full" id='discountPrice' onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* images */}
        <div className="flex flex-col">
          {/* upload button */}
          {
            formData.imageUrls.length > 0 ?
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* images preview */}
                {formData.imageUrls.map((url, idx) =>
                  <div key={idx} className="relative">
                    <img src={url} className="w-full h-40 rounded-lg object-cover" />
                    <button onClick={() => deleteImage(url)} type="button" className="absolute inset-0 opacity-0 hover:opacity-60 rounded-lg bg-gray-800 text-gray-200 flex items-center justify-center">
                      <MdDelete fontSize={40} />
                    </button>
                  </div>
                )}

                {/* add more button */}
                {
                  formData.imageUrls.length < 4 &&
                  <label
                  htmlFor="images"
                  className=" h-40 rounded-lg border-2 border-dashed border-gray-500 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 flex items-center justify-center cursor-pointer">
                    {loading? <Spinner /> : <IoMdAdd fontSize={40} />}
                  </label>
                }
              </div>
              :
              <label htmlFor="images" className="upload-img">
                {
                  loading ?
                    <Spinner size="lg" />
                    :
                    <>
                      <IoCloudUploadOutline fontSize={80} />
                      <span>Add to gallery *</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">The first image will be cover (max 4)</span>
                    </>
                }
              </label>
          }

          {/* actuall input tag (hidden) */}
          <input
            type="file" id='images' accept="image/*" multiple className="hidden"
            onChange={uploadToGallery}
          />
          {/* error */}
          {
            formDataError.imageUrls &&
            <small className="text-red-700 flex items-center gap-0.5">
              <MdErrorOutline />
              {formDataError.imageUrls}
            </small>
          }
        </div>


        {/* submit button */}
        <button className="submit mt-2" disabled={loading}>
          {
            loading ? <Spinner />
              :
              listing ? 'Update Listing' : 'Create Listing'
          }
        </button>
      </form>
    </main>
  )
}

export default ListingForm