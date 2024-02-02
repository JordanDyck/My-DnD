import {useRef, useState} from "react"

import NewSubClassFeature from "./NewSubClassFeature"

const SubClassBuilder = () => {
  const [newfeature, setNewFeature] = useState([])
  const [savedFormData, setSavedFormData] = useState([])
  const inputRef = useRef()
  console.log(savedFormData)

  // creates a NewSubClassFeature component on btn click
  const addFeature = () => {
    setNewFeature(
      newfeature.concat(
        <NewSubClassFeature
          key={newfeature.length}
          inputRef={inputRef}
          featureKey={newfeature.length}
          setSavedFormData={setSavedFormData}
          savedFormData={savedFormData}
        />
      )
    )
    inputRef.current?.focus()
  }
  return (
    <div className="sub-class">
      {newfeature}
      <button onClick={addFeature}>add new feature</button>
    </div>
  )
}
export default SubClassBuilder
