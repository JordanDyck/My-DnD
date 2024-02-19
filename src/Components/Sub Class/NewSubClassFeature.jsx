import {useState} from "react"
import Switch from "react-switch"

const NewSubClassFeature = ({updateFormData, disableComponent}) => {
  const [abilityImpovToggle, setAbilityImpovToggle] = useState(false)
  const [featureName, setFeatureName] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    updateFormData(data)
  }

  return (
    <div className="sub-class-feature">
      {disableComponent === false && (
        <div className="ability-improv-toggle">
          <label>
            <span>Ability score+:</span>
            {/* the toggle btn */}
            <Switch
              className="toggle-switch"
              onChange={() => {
                setAbilityImpovToggle((prev) => !prev)
                if (!abilityImpovToggle) {
                  // the toggle is acually set to true. Don't question it.
                  setFeatureName("Ability score improvement")
                  updateFormData({
                    featureName: "Ability score improvement",
                    feature: "",
                  })
                } else {
                  setFeatureName("")
                  updateFormData({
                    featureName: "",
                  })
                }
              }}
              checked={abilityImpovToggle}
            />
          </label>
        </div>
      )}
      <form onChange={onSubmit}>
        <fieldset disabled={disableComponent}>
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
            value={featureName}
            readOnly={abilityImpovToggle ? true : false}
          />
          {!disableComponent && (
            <textarea
              name="feature"
              placeholder="Description..."
              style={{display: !abilityImpovToggle ? "initial" : "none"}}
            ></textarea>
          )}
        </fieldset>
      </form>
    </div>
  )
}
export default NewSubClassFeature
