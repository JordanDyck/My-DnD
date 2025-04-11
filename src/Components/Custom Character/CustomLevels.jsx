import {useState} from "react"
import CustomTraits from "./CustomTraits"
import LevelEditor from "./LevelEditor"

const CustomLevels = ({setDetails, details, type}) => {
  const [currentLevel, setCurrentLevel] = useState([1]) // keeps track of what level you're writing in.
  const [isSaved, setIsSaved] = useState(false)

  const newLevel = () => {
    // collapses prev level for nicer display.
    setCurrentLevel((prev) => [
      ...prev,
      currentLevel[currentLevel.length - 1] + 1,
    ])

    // sets the new level with prev level class_specifics & spellcasting
    setDetails((prev) => ({
      ...prev,
      levels: [
        ...prev.levels,
        {
          level: currentLevel.length + 1,
          features: [{}],
          class_specific: prev.levels[currentLevel.length - 1].class_specific,
          spellcasting: details.spellcasting.spell_save?.length
            ? prev.levels[currentLevel.length - 1].spellcasting
            : {},
        },
      ],
    }))

    setIsSaved(false)
  }
  return (
    <div className="levels-wrapper">
      {currentLevel.map((level, i) => {
        return (
          <div key={`currentlevel_${i}`} className="level-container">
            {type === "traits" ? (
              <CustomTraits setTraitData={setDetails} isEditing={false} />
            ) : (
              <LevelEditor
                level={level}
                details={details}
                setDetails={setDetails}
                currentLevel={currentLevel.length}
                setIsSaved={setIsSaved}
                isSaved={isSaved}
              />
            )}
          </div>
        )
      })}
      {type === "levels" && (
        <button
          type="button"
          className="new-level-btn"
          onClick={() => {
            newLevel()
          }}
          disabled={!isSaved}
        >
          Add new level
        </button>
      )}
    </div>
  )
}
export default CustomLevels
