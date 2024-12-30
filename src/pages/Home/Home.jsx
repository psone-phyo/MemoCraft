import React from 'react'
import Nav from '../../components/Nav'
import NoteCard from '../../components/NoteCard'
import AddDialog from '../../components/AddDialog'

const Home = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
        <Nav/>

        <div className='my-5 mx-auto w-[95%] lg:w-[80%] grid sm:grid-cols-3 gap-3'>
            <NoteCard title="Testing" date="3/9/2024" content="lorem sfsdfs....." tag="test"/>
        </div>

        <div className='fixed bottom-5 right-5'>
          <AddDialog/>
        </div>
        
    </div>
  )
}

export default Home