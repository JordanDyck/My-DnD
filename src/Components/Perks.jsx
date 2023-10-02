import axios from "axios"
import {useEffect, useState} from "react"

import {useDispatch, useSelector} from "react-redux"

import PerkFilterBlackList from "./PerkFilterBlackList.json"
import PerkMap from "./PerkMap"
import {saveCharacterDetails} from "../Store/slices/characterSlice"
import {classLvlFilter, classPerkFilter, racePerkFilter} from "./utilities"

const Perks = ({category, subCategory, optionalURL}) => {
  const [raceDetails, setRaceDetails] = useState([])
  const [classDetails, setClassDetails] = useState([])
  console.log(optionalURL & "class", classDetails)
  const characterDetails = useSelector((store) => store.character)
  const dispatch = useDispatch()

  useEffect(() => {
    if (category && subCategory) {
      axios
        .get(
          `https://www.dnd5eapi.co/api/${category}/${subCategory}${optionalURL}`
        )
        .then((res) => {
          const data = res.data
          optionalURL && setClassDetails(data)
          !optionalURL && setRaceDetails(data)
        })
    }
  }, [category, subCategory, optionalURL])

  const filteredRaceDetails = Object.entries(raceDetails).filter((value) => {
    if (!PerkFilterBlackList.base.includes(value[0])) {
      return true
    }
    return false
  })

  return (
    <div className="perk-wrapper">
      {!characterDetails.value.length && filteredRaceDetails.length && (
        <PerkMap
          filteredRaceDetails={filteredRaceDetails}
          perkFilter={
            category === "races"
              ? racePerkFilter
              : category === "classes"
              ? classPerkFilter
              : classLvlFilter
          }
        />
      )}
      <button
        className="save-race-btn"
        onClick={() => {
          dispatch(saveCharacterDetails(filteredRaceDetails))
        }}
        disabled={characterDetails.value.length}
      >
        save
      </button>
    </div>
  )
}
export default Perks
