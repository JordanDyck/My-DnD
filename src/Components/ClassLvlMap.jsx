import {useState} from "react"
import Select from "react-select"

import ClassLvlDetails from "./ClassLvlDetails"
const ClassLvlMap = ({classDetails}) => {
  const [currentLvl, setCurrentLvl] = useState()
  // const [activeDetails, setActiveDetails] = useState({})

  const classLvlOptions = classDetails?.map(({level}) => ({
    value: level,
    label: "level " + level,
  }))

  return (
    <div className="class-lvl-details">
      {classDetails && (
        <Select
          options={classLvlOptions}
          onChange={(choice) => {
            setCurrentLvl(choice.value)
          }}
          placeholder="level preview"
        />
      )}
      {currentLvl && <ClassLvlDetails perk={classDetails[currentLvl - 1]} />}
    </div>
  )
}
export default ClassLvlMap
