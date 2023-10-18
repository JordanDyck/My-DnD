import axios from "axios"
import {useEffect, useMemo, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {classPerkFilter, racePerkFilter} from "./utilities"

import PerkFilterBlackList from "./PerkFilterBlackList.json"
import PerkMap from "./PerkMap"
import ClassLvlMap from "./ClassLvlMap"

const Perks = ({category, subCategory, optionalURL}) => {
  const [raceDetails, setRaceDetails] = useState([])

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
  }, [raceDetails])

  return (
    <div className="perk-wrapper">
      {!characterDetails.value.length && (
        <>
          {!optionalURL && (
            <PerkMap
              filteredRaceDetails={filteredRaceDetails}
              perkFilter={
                category === "races" ? racePerkFilter : classPerkFilter
              }
            />
          )}

          {optionalURL && (
            <ClassLvlMap classDetails={optionalURL && raceDetails} />
          )}
        </>
      )}
    </div>
  )
}
export default Perks
