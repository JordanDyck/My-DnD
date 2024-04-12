import {useState} from "react"
import Level from "./Level"

const CustomLevels = ({setDetails}) => {
  const [currentLevel, setCurrentLevel] = useState([1])
  const [disableNewLevel, setDisableNewLevel] = useState(true)

  const newLevel = () => {
    setCurrentLevel((prev) => [
      ...prev,
      currentLevel[currentLevel.length - 1] + 1,
    ])
    setDisableNewLevel(true)
  }

  return (
    <div className="levels-wrapper">
      {currentLevel.map((level, i) => {
        return (
          <div key={`currentlevel_${i}`} className="level-container">
            <Level
              level={level}
              setLevelData={setDetails}
              currentLevel={currentLevel.length}
              setDisableNewLevel={setDisableNewLevel}
            />
          </div>
        )
      })}
      <button
        type="button"
        className="new-level-btn"
        onClick={() => {
          newLevel()
        }}
        disabled={disableNewLevel === true}
      >
        Add new level
      </button>
    </div>
  )
}
export default CustomLevels
