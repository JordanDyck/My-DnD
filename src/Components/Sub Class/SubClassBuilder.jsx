import {useState} from "react"

import NewSubClassFeature from "./NewSubClassFeature"

const SubClassBuilder = ({setStoredDetails, setShowCharacterDetails}) => {
  const [newfeature, setNewFeature] = useState([])
  const [subClassName, setSubClassName] = useState("")
  // console.log(storedDetails)
  const defaultFeature = {
    key: newfeature.length,
    disabled: false,
    formData: {
      feature: "",
      featureName: "",
      level: "",
    },
  }

  const addFeature = () => {
    setNewFeature((prev) => {
      return [...prev, defaultFeature]
    })
  }

  const updateFormData = (value, index) => {
    const featureCopy = [...newfeature]
    featureCopy[index] = {
      ...featureCopy[index],
      formData: {...featureCopy[index].formData, ...value},
    }
    setNewFeature(featureCopy)
  }

  return (
    <div className="sub-class">
      <input
        className="subclass-name"
        onChange={(e) => {
          setSubClassName(e.target.value)
        }}
        placeholder="subclass name..."
      />
      {newfeature.map((feature, index) => {
        return (
          <NewSubClassFeature
            key={feature.key}
            disableComponent={feature.disabled}
            updateFormData={(value) => updateFormData(value, index)}
          />
        )
      })}

      <button
        onClick={() => {
          addFeature()
          if (newfeature.length) {
            let updatedFeature = [...newfeature].map((feature) => {
              return {...feature, disabled: true}
            })
            setNewFeature([...updatedFeature, defaultFeature])
          }
        }}
        disabled={
          newfeature[newfeature.length - 1]?.formData.featureName.length <= 0 ||
          newfeature[newfeature.length - 1]?.formData.level.length <= 0
        }
      >
        add new feature
      </button>
      <button
        className="save-subclass-btn"
        onClick={() => {
          const mappedFormData = newfeature.map((data) => {
            return data.formData
          })
          setStoredDetails((prev) => ({
            ...prev,
            subClass: {
              name: subClassName,
              features: mappedFormData,
            },
          }))
          setShowCharacterDetails((prev) => ({
            ...prev,
            subClass: false,
          }))
        }}
        disabled={
          !subClassName ||
          !newfeature.length ||
          newfeature[newfeature.length - 1]?.formData.featureName.length <= 0 ||
          newfeature[newfeature.length - 1]?.formData.level.length <= 0
        }
      >
        save subClass
      </button>
    </div>
  )
}
export default SubClassBuilder
