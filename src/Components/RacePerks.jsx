import axios from "axios"
import {useEffect, useState} from "react"
import {v4 as uuid} from "uuid"

import {handleformat, perkFilter} from "./utilities"
import PerkFilterBlackList from "./PerkFilterBlackList.json"

const RacePerks = ({raceName}) => {
  const [raceDetails, setRaceDetails] = useState({})
  useEffect(() => {
    if (raceName.length) {
      axios.get(`https://www.dnd5eapi.co/api/races/${raceName}`).then((res) => {
        const data = res.data
        setRaceDetails(data)
      })
    }
  }, [raceName])
  const filteredRaceDetails = Object.entries(raceDetails).filter((value) => {
    if (!PerkFilterBlackList.base.includes(value[0])) {
      // console.log(value)
      return value
    }
    return ""
  })

  // console.log(filteredRaceDetails)
  return filteredRaceDetails.map(([key, value]) => {
    const customizeValue = perkFilter?.[key]?.(value)
    const valueToCheck = customizeValue === undefined ? value : customizeValue
    const renderedValue = handleformat(valueToCheck, key)

    return (
      <div key={uuid()}>
        <h4>
          {key.replaceAll("_", " ")}
          {renderedValue ? ":" : ""}
        </h4>
        {renderedValue}
      </div>
    )
  })
}
export default RacePerks
