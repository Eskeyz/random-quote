import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Card = () => {
    
  const [data, setData] = useState("")  
  const [selectImage, setSelectImage] = useState(null)
  
  const handleImage = (e) => {
    const imageFile = e.target.files[0]
    if (imageFile && isImageFileAllowed(imageFile)) {
        setSelectImage(URL.createObjectURL(imageFile));
      } else {
        alert("Hanya gambar dengan format .png, .jpg, .jpeg atau .gif yang diizinkan!");
      }
  }

  const isImageFileAllowed = (file) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    return allowedTypes.includes(file.type);
  }
  
  const getData = () => {
    axios.get('https://api.quotable.io/random?tags=love')
    .then(response => {
        setData(response.data)
    }, (error) => {
        console.log(error)
    })
  }

  useEffect(() => {
    getData()
  }, [])
    
  return (
    <div className=''>
        <div id='quotes' className='max-w-md px-8 py-4 my-20 text-white rounded-lg shadow-lg bg-slate-800'>
            <div className='flex justify-start mt-2'>
            {selectImage && <img src={selectImage} alt="image" className='w-[60px] h-[60px] rounded-full'  />}
                <div className='text-left'>
                    <p className='ml-4 text-lg font-bold'> {data.author} </p>
                    <p className='ml-4 -mt-1 text-base font-semibold text-gray-500'>@{data.authorSlug} </p>
                </div> 
            </div>
            <div className='text-left'>
                <p className='mt-2 text-lg font-medium gray-200'>{data.content}</p>
            </div>
            <div className='flex justify-between mt-4'>
                <p className='text-sm font-medium text-gray-500'>Made with ❤ by Eskey.</p>
                <p className='text-sm font-medium text-gray-500'>{data.dateAdded}</p>
            </div>
        </div>
        <div className='flex flex-col'>
            <section>
                <button className='px-4 py-2 mt-4 text-white rounded-lg shadow-lg bg-slate-800' onClick={getData}>Generate new quote</button>
            </section>
            <label className="block mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload your image if you want use photo profile. *( 60x60 px )</label>
            <input type="file" accept=".png, .jpg, .jpeg, .gif" onChange={handleImage} className="block w-full text-sm text-gray-400 placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer focus:outline-none" id="file_input" />          
        </div>
        <div className='mt-5 mb-[50px]'>
            <p className='text-white'>Note: later i'll add download button.</p>
        </div>
    </div>
  )
}

export default Card