import {useState} from "react"
import Switch from "react-switch"

const defaultLevelData = {
  feature: "",
  featureName: "",
}
const Level = ({level, setLevelData, currentLevel, setDisableNewLevel}) => {
  const [levelFeatures, setLevelFeatures] = useState({
    [`level_${level}`]: [defaultLevelData],
  })

  const [abilityImpovToggle, setAbilityImpovToggle] = useState(false)
  const newFeature = () => {
    setLevelFeatures((prev) => ({
      ...prev,
      [`level_${level}`]: [...prev[`level_${level}`], defaultLevelData],
    }))
    setDisableNewLevel(true)
  }
  const handleData = (e, index) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    const levelCopy = {...levelFeatures}
    levelCopy[`level_${level}`][index] = data
    setLevelFeatures(() => ({
      ...levelCopy,
    }))

    setLevelData((prev) => ({
      ...prev,
      levels: {
        ...prev.levels,
        [`level_${level}`]: levelFeatures[[`level_${level}`]],
      },
    }))

    if (data.featureName) {
      setDisableNewLevel(false)
    } else setDisableNewLevel(true)
  }

  return (
    <div className={level === currentLevel ? "level" : "level-collapsed"}>
      <h4>level {level}</h4>
      {level === currentLevel && (
        <div className="ability-improv-toggle">
          <label>
            <span>Ability score+</span>
            {/* the toggle btn */}
            <Switch
              className="toggle-switch"
              onColor="#4ae173"
              onHandleColor="#6dff79"
              handleDiameter={29}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              width={60}
              height={30}
              onChange={() => {
                const AbilityScoreImprovement = {
                  [`level_${level}`]: [
                    {featureName: "Ability score improvement"},
                  ],
                }
                const defaultFeature = {[`level_${level}`]: [{featureName: ""}]}

                setAbilityImpovToggle((prev) => !prev)
                if (!abilityImpovToggle) {
                  setLevelFeatures((prev) => ({
                    ...prev,
                    ...AbilityScoreImprovement,
                  }))
                  setLevelData((prev) => ({
                    ...prev,
                    levels: {
                      ...prev.levels,
                      ...AbilityScoreImprovement,
                    },
                  }))
                  setDisableNewLevel(false)
                } else {
                  setLevelFeatures((prev) => ({
                    ...prev,
                    ...defaultFeature,
                  }))
                  setLevelData((prev) => ({
                    ...prev,
                    levels: {
                      ...prev.levels,
                      ...defaultFeature,
                    },
                  }))
                  setDisableNewLevel(true)
                }
              }}
              checked={abilityImpovToggle}
            />
          </label>
        </div>
      )}
      {levelFeatures[`level_${level}`].map((_, index) => {
        return (
          <form
            className="level-feature"
            key={`feature_${index + 1}`}
            onChange={(e) => handleData(e, index)}
          >
            {level === currentLevel ? (
              <input
                onChange={() => {}} // onChange needed to prevent errors
                name="featureName"
                placeholder="feature name"
                value={levelFeatures[`level_${level}`][index]?.featureName}
                readOnly={abilityImpovToggle}
              />
            ) : (
              <p>{levelFeatures[`level_${level}`][index].featureName}</p>
            )}
            {!abilityImpovToggle && (
              <textarea
                name="feature"
                placeholder="description..."
                style={{display: level !== currentLevel ? "none" : "initial"}}
              />
            )}
          </form>
        )
      })}
      {!abilityImpovToggle && (
        <button
          className="new-feature-btn"
          type="button"
          onClick={() => newFeature()}
          style={{display: level !== currentLevel ? "none" : "initial"}}
          disabled={
            levelFeatures[`level_${level}`][
              levelFeatures[`level_${level}`].length - 1
            ].featureName === ""
          }
        >
          new feature
        </button>
      )}
    </div>
  )
}
export default Level
