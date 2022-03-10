import { Container, Grid, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import NoteCard from "../components/NoteCard";
import Masonry from 'react-masonry-css';

export default function Notes() {
  const [notes, setNotes] = useState([]);
 {/*to fetch data whenever on page first render, redirecting from another page will also render this page again */}
  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])

  {/*one thing to note here is the handleDelete function who is invoked inside child component 'NoteCard'
    is created here inside parent component bcoz it need to use the state from this parent 'notes' and 'setnotes'
    so inside of passing them as props, we created the whole function inside parent and pass that function
    it's worth noting that by this way the function work fine although it is called inside child in which the 
    state that function needs does not exist*/}
  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/notes/" + id, {
      method: 'DELETE'
    })

    const newNotes = notes.filter((note) => note.id !== id)
    setNotes(newNotes)
    console.log(notes)
  }
 {/*Below constant is a part of the layouting npm module called 'react-masonry-css' */}
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => {
          return (
            <div key={note.id}>
              <NoteCard note={note} handleDelete={handleDelete}/>
            </div>
          )
        })}
      </Masonry>
    </Container>
  )
}
