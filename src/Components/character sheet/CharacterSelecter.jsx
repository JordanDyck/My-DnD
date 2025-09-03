import Select from "react-select"
import {useDispatch} from "react-redux"
import {useMemo, useEffect} from "react"

import {AiOutlineUserAdd} from "react-icons/ai"
import {RiDeleteBinLine} from "react-icons/ri"
import {setCurrentCharacter} from "../../Store/slices/characterSlice"
import {setLocalStorage} from "../utilities"
import ExampleCharacter from "../../example character/ExampleCharacter.json"

const CharacterSelecter = ({setShowCreator, deleteCharacter}) => {
  const dispatch = useDispatch()
  const currentCharacter = localStorage.getItem("currentCharacter")

  useEffect(() => {
    // if localStorage does not have "currentCharacter", that means its your first time at site, so add example character
    if (!Object.keys(localStorage).includes("currentCharacter")) {
      dispatch(setCurrentCharacter("john doe"))
      localStorage.setItem("john doe", JSON.stringify(ExampleCharacter))
    } else {
      return
    }
  }, [])

  const keys = Object.keys(localStorage)

  const options = useMemo(() => {
    return keys
      .filter((prop) => prop !== "currentCharacter")
      .map((option) => {
        return {value: option, label: option}
      })
  }, [keys])

  return (
    <div className="character-selector">
      {options.length ? (
        <button className="delete-character-btn" onClick={() => deleteCharacter(true)}>
          <RiDeleteBinLine />
        </button>
      ) : (
        ""
      )}
      <Select
        className="selector"
        options={options}
        onChange={(e) => {
          dispatch(setCurrentCharacter(e.value))
          setLocalStorage("currentCharacter", e.value)
        }}
        placeholder="select Character"
        styles={{
          control: (base) => ({
            ...base,
            textAlign: "center",
          }),
          option: (base) => ({
            ...base,
            textAlign: "center",
          }),
        }}
      />
      <button
        className="create-character-btn"
        onClick={() =>
          setShowCreator((prev) => ({
            ...prev,
            creator: true,
          }))
        }
      >
        <AiOutlineUserAdd />
      </button>
    </div>
  )
}
export default CharacterSelecter
