import axios from "axios"
import {useEffect, useState} from "react"

import {useDispatch, useSelector} from "react-redux"

import PerkFilterBlackList from "./PerkFilterBlackList.json"
import RacePerkMap from "./RacePerkMap"
import {saveCharacterDetails} from "../Store/slices/characterSlice"

const RacePerks = ({raceName, characterName}) => {
  const [raceDetails, setRaceDetails] = useState({})

  const characterDetails = useSelector((store) => store.character)
  const dispatch = useDispatch()
  console.log(characterDetails)

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
      return value
    }
    return ""
  })
  return (
    <div className="race-perk-wrapper">
      {!characterDetails.value.length && (
        <RacePerkMap filteredRaceDetails={filteredRaceDetails} />
      )}
      <button
        className="save-race-btn"
        onClick={() => {
          dispatch(saveCharacterDetails(filteredRaceDetails))
          dispatch(saveCharacterDetails(characterName))
        }}
        disabled={characterDetails.value.length}
      >
        save
      </button>
    </div>
  )
}
export default RacePerks
