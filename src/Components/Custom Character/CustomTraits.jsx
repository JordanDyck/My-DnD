import {useEffect, useState} from "react"

const defaultTraitData = {
  name: "",
  value: "",
}
const CustomTraits = ({level, setTraitData, currentLevel}) => {
  const [levelFeatures, setLevelFeatures] = useState([defaultTraitData])

  const newFeature = () => {
    setLevelFeatures((prev) => [...prev, defaultTraitData])
  }
  const handleData = (e, index) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    const levelCopy = [...levelFeatures]

    levelCopy[index] = data
    setLevelFeatures(() => levelCopy)
  }
  useEffect(() => {
    // moves levelFeatures into raceDetails.traits in CustomRace.jsx
    setTraitData((prev) => ({
      ...prev,
      traits: levelFeatures,
    }))
  }, [levelFeatures, setTraitData])

  return (
    <div className={level === currentLevel ? "level" : "level-collapsed"}>
      <h4>{"traits"}</h4>
      {levelFeatures.map((_, index) => {
        return (
          <form
            className="level-feature"
            key={`feature_${index + 1}`}
            onChange={(e) => handleData(e, index)}
          >
            {level === currentLevel ? (
              <input
                // onChange={() => {}} // onChange needed to prevent errors
                name="name"
                placeholder="feature name"
                // value={levelFeatures[`level_${level}`][index]?.featureName}
              />
            ) : (
              <p>{levelFeatures[index]?.featureName}</p>
            )}

            <textarea
              name="feature"
              placeholder="description..."
              style={{display: level !== currentLevel ? "none" : "initial"}}
            />
          </form>
        )
      })}

      <button
        className="new-feature-btn"
        type="button"
        onClick={() => newFeature()}
        style={{display: level !== currentLevel ? "none" : "initial"}}
        disabled={!levelFeatures[level - 1].name}
      >
        new trait
      </button>
    </div>
  )
}
export default CustomTraits
