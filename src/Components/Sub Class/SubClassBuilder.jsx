import {useEffect, useRef, useState} from "react"

import NewSubClassFeature from "./NewSubClassFeature"

const SubClassBuilder = () => {
  const [newfeature, setNewFeature] = useState([])
  const [savedFormData, setSavedFormData] = useState({})
  const inputRef = useRef()

  const currentFeature = Object.keys(savedFormData)[newfeature?.length - 1]
  // creates a NewSubClassFeature component on btn click

  const addFeature = () => {
    setNewFeature((prev) => {
      return [
        ...prev,
        <NewSubClassFeature
          key={prev.length}
          inputRef={inputRef}
          featureKey={prev.length}
          setSavedFormData={setSavedFormData}
          savedFormData={savedFormData}
        />,
      ]
    })
  }
  console.log(savedFormData)
  useEffect(() => {
    // focus on feature name when a new feature is created.
    inputRef.current?.focus()
  }, [newfeature])
  return (
    <div className="sub-class">
      {newfeature}

      <button
        onClick={() => {
          addFeature()
          setSavedFormData((prev) => ({
            ...prev,
            [`feature_${newfeature.length + 1}`]: {
              feature: "",
              featureName: "",
              level: "",
            },
          }))
        }}
        disabled={savedFormData[currentFeature]?.featureName.length <= 0}
      >
        add new feature
      </button>
    </div>
  )
}
export default SubClassBuilder
