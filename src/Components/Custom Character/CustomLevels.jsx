import {useState} from "react"
import Level from "./Level"

const CustomLevels = ({setDetails, details}) => {
  const [currentLevel, setCurrentLevel] = useState([1])
  // const [levelData, setLevelData] = useState([])

  const newLevel = () => {
    setCurrentLevel((prev) => [
      ...prev,
      currentLevel[currentLevel.length - 1] + 1,
    ])
  }

  return (
    <div className="levels-wrapper">
      {currentLevel.map((level, i) => {
        return (
          <div key={`currentlevel_${i}`} className="level-container">
            <Level level={level} setLevelData={setDetails} />
          </div>
        )
      })}
      <button
        type="button"
        className="new-level-btn"
        onClick={() => {
          newLevel()
        }}
      >
        Add new level
      </button>
    </div>
  )
}
export default CustomLevels
