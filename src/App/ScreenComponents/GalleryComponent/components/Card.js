import React, { useEffect, useState } from 'react'
import GalleryCard from './GalleryCard'

const Card = ({ imageDataProps }) => {
  return (
   <>
   <div className='grid md:grid-cols-2 lg:grid-cols-3 py-16 mx-2 gap-14'>
    {
        imageDataProps.map((data)=>{
        return(
          <GalleryCard
          key={data.id}
          {...data}
          />
        )
      })
    }
   </div>
   </>
  )
}

export default Card