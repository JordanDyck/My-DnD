import {useState} from "react"
import {useDispatch} from "react-redux"
import {RiDeleteBinLine} from "react-icons/ri"
import {RxDropdownMenu} from "react-icons/rx"
import {CiEdit} from "react-icons/ci"

import {updateCharacter} from "../../../Store/slices/characterSlice"

const defaultNoteData = {title: "", desc: ""}

const Notes = ({character}) => {
  const [toggleTextArea, setToggleTextArea] = useState({
    create: false, // create new note
    edit: false, // edit current note
    view: false, // view current note
  })

  const [displayNote, setDisplayNote] = useState() // note title
  const [note, setNote] = useState(defaultNoteData)
  const dispatch = useDispatch()

  const showActiveNote = (id, key) => {
    switch (key) {
      case "desc":
        setDisplayNote(id)

        setToggleTextArea((prev) => ({
          ...prev,
          view: !prev.view,
          edit: false,
        }))
        if (toggleTextArea.view) {
          setDisplayNote()
        }
        break
      case "edit":
        setDisplayNote(id)

        setToggleTextArea((prev) => ({
          ...prev,
          view: false,
          edit: !prev.edit,
        }))

        if (toggleTextArea.edit) {
          setDisplayNote()
        }
        break

      default:
        setDisplayNote()
        break
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
    setToggleTextArea((prev) => ({
      ...prev,
      create: !prev.create,
    }))
  }

  const editNote = (newValue, currentNote) => {
    const notes = [...character.notes]

    const newNotes = notes.map((note) => {
      if (currentNote.title === note.title) {
        return {title: note.title, desc: newValue}
      } else return note
    })
    const updatedNotes = {
      ...character,
      notes: newNotes,
    }
    dispatch(updateCharacter(updatedNotes))
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
                {/* show/hide note desc */}
                {note.desc.length ? (
                  <button
                    onClick={() => {
                      showActiveNote(note.title, "desc")
                    }}
                  >
                    <RxDropdownMenu />
                  </button>
                ) : (
                  ""
                )}

                {/* edit note */}
                <button onClick={() => showActiveNote(note.title, "edit")}>
                  <CiEdit />
                </button>

                {/* delete note */}
                <button onClick={() => removeNote(note)}>
                  <RiDeleteBinLine />
                </button>
              </div>

              {toggleTextArea.view && note.title === displayNote && (
                <p>{note.desc}</p>
              )}
              {toggleTextArea.edit && displayNote === note.title && (
                <textarea
                  defaultValue={note.desc}
                  onChange={(e) => editNote(e.target.value, note, index)}
                ></textarea>
              )}
            </div>
          )
        })}
      </div>
      <button
        className="add-note-btn"
        onClick={() => {
          setToggleTextArea((prev) => ({
            ...prev,
            create: !prev.create,
          }))

          setNote(defaultNoteData)
        }}
      >
        {toggleTextArea.create ? "cancel" : "add new note"}
      </button>

      {toggleTextArea.create && (
        // create new note
        <form className="note-maker" onChange={(e) => handleData(e)}>
          <input
            name="title"
            placeholder="title..."
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <textarea name="desc"></textarea>
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
