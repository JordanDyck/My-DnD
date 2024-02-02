import {useState} from "react"
import Switch from "react-switch"

const NewSubClassFeature = ({
  setSavedFormData,
  featureKey,
  savedFormData,
  inputRef,
}) => {
  const [abilityImpovToggle, setAbilityImpovToggle] = useState(false)
  const [featureName, setFeatureName] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    if (!abilityImpovToggle) {
      setSavedFormData((prev) => ({
        ...prev,
        [`feature_${featureKey + 1}`]: data,
      }))
    } else if (abilityImpovToggle) {
    }
  }
  return (
    <div className="sub-class-feature">
      <div className="ability-improv-toggle">
        <label>
          <span>Ability score+:</span>
          <Switch
            className="toggle-switch"
            onChange={() => {
              setAbilityImpovToggle((prev) => !prev)
              if (!abilityImpovToggle) {
                // the toggle is acually set to true. don't question it.
                setSavedFormData((prev) => ({
                  ...prev,
                  [`feature_${featureKey + 1}`]: {
                    ...prev?.[`feature_${featureKey + 1}`],
                    featureName: "Ability score improvement",
                    feature: "",
                  },
                }))
              } else {
                setFeatureName("")
              }
            }}
            checked={abilityImpovToggle}
          />
        </label>
      </div>
      <form onChange={onSubmit} key={featureKey}>
        <input
          className="feature-level"
          type="number"
          name="level"
          placeholder="lvl"
        />

        <input
          className="feature-name"
          name="featureName"
          placeholder="Feature name"
          onChange={(e) => {
            setFeatureName(e.target.value)
          }}
          ref={inputRef}
          value={featureName}
          readOnly={abilityImpovToggle ? true : false}
        />

        {!abilityImpovToggle && (
          <textarea name="feature" placeholder="Description..."></textarea>
        )}
      </form>
    </div>
  )
}
export default NewSubClassFeature
