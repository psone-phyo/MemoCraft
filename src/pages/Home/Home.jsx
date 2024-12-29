import React from 'react'
import Nav from '../../components/Nav'
import NoteCard from '../../components/NoteCard'
import SearchInput from '../../components/SearchInput'
const Home = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
        <Nav/>

        <div className='my-5 mx-auto w-[95%] lg:w-[80%] grid sm:grid-cols-3 gap-3'>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
            <NoteCard/>
        </div>
    </div>
  )
}

export default Home