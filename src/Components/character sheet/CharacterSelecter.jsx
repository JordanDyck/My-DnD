import Select from "react-select"
import {AiOutlineUserAdd} from "react-icons/ai"

const CharacterSelecter = ({setSelectedCharacter, setShowCreator}) => {
  const options = Object.keys(localStorage).map((option) => {
    return {value: option, label: option}
  })

  return (
    <div className="character-selector">
      <Select
        className="selector"
        options={options}
        onChange={(e) => setSelectedCharacter(e.value)}
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
      ></Select>
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
