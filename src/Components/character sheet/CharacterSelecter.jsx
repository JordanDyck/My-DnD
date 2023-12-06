import Select from "react-select"
import {AiOutlineUserAdd} from "react-icons/ai"
import {setCurrentCharacter} from "../../Store/slices/characterSlice"
import {useDispatch} from "react-redux"

const CharacterSelecter = ({setShowCreator}) => {
  const dispatch = useDispatch()
  const options = Object.keys(localStorage).map((option) => {
    return {value: option, label: option}
  })

  return (
    <div className="character-selector">
      <Select
        className="selector"
        options={options}
        onChange={(e) => {
          dispatch(setCurrentCharacter(e.value))
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
        onClick={() => setShowCreator(true)}
      >
        <AiOutlineUserAdd />
      </button>
    </div>
  )
}
export default CharacterSelecter
