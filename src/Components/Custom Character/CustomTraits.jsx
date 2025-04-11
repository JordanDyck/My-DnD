import {useEffect, useState} from "react"

const defaultTraitData = {
  name: "",
  value: "",
}
const CustomTraits = ({setTraitData, isEditing}) => {
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
      traits: !!levelFeatures[0].name ? levelFeatures : [],
    }))
  }, [levelFeatures, setTraitData])

  return (
    <div className="level">
      {!isEditing && <h4>traits</h4>}
      {levelFeatures.map((_, index) => {
        return (
          <form
            className="level-feature"
            key={`feature_${index + 1}`}
            onChange={(e) => handleData(e, index)}
          >
            {index === levelFeatures.length - 1 ? ( // after making a trait, it'll collapse into just the name
              <>
                <input name="name" placeholder="feature name" />
                <textarea name="feature" placeholder="description..." />
              </>
            ) : (
              <p>{levelFeatures[index]?.name}</p>
            )}
          </form>
        )
      })}
      {!isEditing && (
        <button
          className="new-feature-btn"
          type="button"
          onClick={() => newFeature()}
          // style={{display: level !== currentLevel ? "none" : "initial"}}
          disabled={!levelFeatures[levelFeatures.length - 1]?.name}
        >
          new trait
        </button>
      )}
    </div>
  )
}
export default CustomTraits
