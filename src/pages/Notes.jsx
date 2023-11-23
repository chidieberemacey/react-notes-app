import {CiSearch} from 'react-icons/ci'
import { Link } from 'react-router-dom'
import {BsPlusLg} from 'react-icons/bs'
import {GrFormClose}from 'react-icons/gr'
import NoteItem from '../components/NoteItem'
import { useEffect, useState } from 'react'

const Notes = ({notes}) => {

    const [showSearch, setShowSearch] = useState(false);
    const [text, setText] =useState('')
    const [filteredNotes, setFilteredNotes] = useState(notes);

    const handleSearch = () => {
        setFilteredNotes(notes.filter(note => {
            if(note.title.toLowerCase().match(text.toLocaleLowerCase())){
                return note;
            }
        }))
    }

    useEffect(handleSearch, [text])

    return (
      <section>
          <header className='notes__header'>
              {!showSearch && <h2>My Notes</h2>}
              {showSearch && <input type="text" value={text} onChange={(e) => {setText(e.target.value); handleSearch();}} autoFocus placeholder='keyword...' />}
              <button className='btn' onClick={() => setShowSearch(prevState => !prevState)}>{showSearch ? <GrFormClose/> : <CiSearch/>}</button>
          </header>
          <div className="notes__container">
               {filteredNotes.length == 0 && <p className='empty_notes'>No Notes Found</p>}
              {
                  filteredNotes.map(note => <NoteItem key={note.id} note={note} />)
              }
          </div>
          <Link to='/create-note' className='btn add__btn'><BsPlusLg/></Link>
      </section>
    )
}

export default Notes