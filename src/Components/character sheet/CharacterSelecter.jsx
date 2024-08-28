import Select from "react-select"
import {useDispatch} from "react-redux"

import {AiOutlineUserAdd} from "react-icons/ai"
import {RiDeleteBinLine} from "react-icons/ri"
import {setCurrentCharacter} from "../../Store/slices/characterSlice"
import {setLocalStorage} from "../utilities"
import {useMemo} from "react"

const CharacterSelecter = ({setShowCreator, deleteCharacter}) => {
  const dispatch = useDispatch()

  // const options = Object.keys(localStorage)
  //   .filter((prop) => prop !== "currentCharacter")
  //   .map((option) => {
  //     return {value: option, label: option}
  //   })
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
      <button
        className="delete-character-btn"
        onClick={() => deleteCharacter(true)}
      >
        <RiDeleteBinLine />
      </button>
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
