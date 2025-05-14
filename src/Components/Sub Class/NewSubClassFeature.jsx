import {useState} from "react"

const NewSubClassFeature = ({updateFormData, disableComponent}) => {
  const [featureName, setFeatureName] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    updateFormData(data)
  }

  return (
    <div className="sub-class-feature">
      <form onChange={onSubmit}>
        <fieldset disabled={disableComponent}>
          <div className="feature-name-container">
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
            />
          </div>
          {!disableComponent && (
            <textarea name="feature" placeholder="Description..."></textarea>
          )}
        </fieldset>
      </form>
    </div>
  )
}
export default NewSubClassFeature
