import {useState, useEffect} from "react"
import Select from "react-select"
import axios from "axios"

import ClassLvlDetails from "./ClassLvlDetails"
const ClassLvlSelector = ({levelsURL, setStoredDetails}) => {
  const [currentLvl, setCurrentLvl] = useState()
  const [allLevels, setAllLevels] = useState()

  useEffect(() => {
    if (levelsURL) {
      axios.get(`https://www.dnd5eapi.co${levelsURL}`).then((res) => {
        const data = res.data
        setAllLevels(data)
        setStoredDetails((prev) => ({
          ...prev,
          levels: data,
        }))
      })
    }
  }, [levelsURL, setStoredDetails])
  const classLvlOptions = allLevels?.map(({level}) => ({
    value: level,
    label: "level " + level,
  }))

  return (
    <div className="class-lvl-details">
      <h4 className="h4-title">levels:</h4>
      {levelsURL && (
        <Select
          options={classLvlOptions}
          isSearchable={false}
          onChange={(choice) => {
            setCurrentLvl(choice.value)
          }}
          placeholder="level preview"
        />
      )}
      {currentLvl && (
        <ClassLvlDetails
          mainLevel={allLevels[currentLvl - 1]}
          compare={false}
        />
      )}
    </div>
  )
}
export default ClassLvlSelector