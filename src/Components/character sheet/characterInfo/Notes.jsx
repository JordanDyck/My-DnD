import {useState} from "react"
import {useDispatch} from "react-redux"
import {RiDeleteBinLine} from "react-icons/ri"
import {RxDropdownMenu} from "react-icons/rx"

import {updateCharacter} from "../../../Store/slices/characterSlice"

const defaultNoteData = {title: "", note: ""}

const Notes = ({character}) => {
  const [toggleTextArea, setToggleTextArea] = useState(false)
  const [displayNote, setDisplayNote] = useState() // note title
  const [note, setNote] = useState(defaultNoteData)
  const dispatch = useDispatch()

  const showActiveNote = (id) => {
    if (id !== displayNote) {
      setDisplayNote(id)
    } else {
      setDisplayNote()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }

  const handleData = (e) => {
    e.preventDefault()
    // save current note in useState

    setNote((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const saveNote = () => {
    // store current note in local storage

    const updateNotes = {
      ...character,
      notes: [...character.notes, note],
    }
    dispatch(updateCharacter(updateNotes))
    setNote(defaultNoteData)
    setToggleTextArea(false)
  }

  const removeNote = (note) => {
    const filteredNotes = character.notes.filter((item) => {
      return item !== note
    })

    const updateNotes = {
      ...character,
      notes: filteredNotes,
    }
    dispatch(updateCharacter(updateNotes))
  }

  const checkNoteNames = (nameToCheck) => {
    // check if title aready exists, disables save btn if true
    return character.notes.some((obj) => obj.title === nameToCheck)
  }

  return (
    <div className="notes-container">
      <div className="displayed-notes">
        {character.notes.map((note, index) => {
          return (
            <div
              className={
                displayNote === note.title ? " note visible" : "note hidden"
              }
              key={`note_${index}`}
            >
              <div className="title-container">
                <h4>{note.title}:</h4>
                {/* button to show/hide note text */}
                {note.note.length ? (
                  <button
                    onClick={(e) => {
                      showActiveNote(note.title)
                    }}
                  >
                    <RxDropdownMenu />
                  </button>
                ) : (
                  ""
                )}

                <button onClick={() => removeNote(note)}>
                  <RiDeleteBinLine />
                </button>
              </div>

              <p>{note.note}</p>
            </div>
          )
        })}
      </div>
      <button
        className="add-note-btn"
        onClick={() => {
          setToggleTextArea((prev) => !prev)
          setNote(defaultNoteData)
        }}
      >
        {toggleTextArea ? "cancel" : "add new note"}
      </button>

      {toggleTextArea && (
        // create new note
        <form className="note-maker" onChange={(e) => handleData(e)}>
          <input
            name="title"
            placeholder="title..."
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <textarea name="note"></textarea>
          <button
            type="button"
            disabled={!note.title || checkNoteNames(note.title)}
            onClick={(e) => saveNote(e)}
          >
            save
          </button>
        </form>
      )}
    </div>
  )
}
export default Notes
