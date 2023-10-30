import axios from "axios"
import {useEffect, useMemo, useState} from "react"

import {classPerkFilter, racePerkFilter} from "./utilities"

import PerkFilterBlackList from "./PerkFilterBlackList.json"
import PerkMap from "./PerkMap"
import ClassLvlSelector from "./ClassLvlSelector"

const Perks = ({category, subCategory, optionalURL, setStoredDetails}) => {
  const [raceDetails, setRaceDetails] = useState([])
  // console.log({raceDetails})

  useEffect(() => {
    // stores the values from raceData to storedDetails in CharacterCreator component
    if (category === "races") {
      setStoredDetails((prev) => ({...prev, race: raceDetails}))
    }

    if (category === "classes") {
      if (!optionalURL) {
        setStoredDetails((prev) => ({
          ...prev,
          class: raceDetails,
        }))
      } else {
        setStoredDetails((prev) => ({
          ...prev,
          levels: raceDetails,
        }))
      }
    }
  }, [category, optionalURL, raceDetails, setStoredDetails])

  useEffect(() => {
    if (category && subCategory) {
      axios
        .get(
          `https://www.dnd5eapi.co/api/${category}/${subCategory}${optionalURL}`
        )
        .then((res) => {
          const data = res.data

          setRaceDetails(data)
        })
    }
  }, [category, subCategory, optionalURL])

  const filteredRaceDetails = useMemo(() => {
    return Object.entries(!optionalURL && raceDetails).filter((value) => {
      if (!PerkFilterBlackList.base.includes(value[0])) {
        return true
      }

      return false
    })
  }, [raceDetails, optionalURL])

  return (
    <div className="perk-wrapper">
      <>
        {!optionalURL && (
          <PerkMap
            filteredRaceDetails={filteredRaceDetails}
            perkFilter={category === "races" ? racePerkFilter : classPerkFilter}
          />
        )}

        {optionalURL && (
          <ClassLvlSelector classDetails={optionalURL && raceDetails} />
        )}
      </>
    </div>
  )
}
export default Perks
