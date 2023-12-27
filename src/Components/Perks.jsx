import axios from "axios"
import {useEffect, useMemo, useState} from "react"

import {classPerkFilter, racePerkFilter} from "./utilities"

import PerkFilterBlackList from "./PerkFilterBlackList.json"
import PerkMap from "./PerkMap"
import ClassLvlSelector from "./ClassLvlSelector"

const Perks = ({category, subCategory, optionalURL, setStoredDetails}) => {
  const [characterDetails, setCharacterDetails] = useState([])
  const [newProfDetails, setNewProfDetails] = useState([])

  useEffect(() => {
    // stores the values from characterDetails to storedDetails in CharacterCreator component to be put into localStorage
    if (category === "races") {
      setStoredDetails((prev) => ({
        ...prev,
        race: {
          ...characterDetails,
          ability_bonus_options: newProfDetails.ability_bonus_options,
          starting_proficiency_options:
            newProfDetails.starting_proficiency_options,
        },
      }))
    }

    if (category === "classes") {
      if (!optionalURL) {
        setStoredDetails((prev) => ({
          ...prev,
          classDetails: {
            ...characterDetails,
            proficiency_choices: newProfDetails.proficiency_choices,
          },
        }))
      } else {
        setStoredDetails((prev) => ({
          ...prev,
          levels: characterDetails,
        }))
      }
    }
  }, [
    category,
    optionalURL,
    characterDetails,
    newProfDetails,
    setStoredDetails,
    // filteredCharacterDetails,
  ])

  useEffect(() => {
    if (category && subCategory) {
      axios
        .get(
          `https://www.dnd5eapi.co/api/${category}/${subCategory}${optionalURL}`
        )
        .then((res) => {
          const data = res.data

          setCharacterDetails(data)
        })
    }
  }, [category, subCategory, optionalURL])

  const filteredRaceDetails = useMemo(() => {
    return Object.entries(!optionalURL && characterDetails).filter((value) => {
      if (!PerkFilterBlackList.base.includes(value[0])) {
        return true
      }

      return false
    })
  }, [characterDetails, optionalURL])

  return (
    <div className="perk-wrapper">
      <>
        {!optionalURL && (
          <PerkMap
            filteredRaceDetails={filteredRaceDetails}
            perkFilter={category === "races" ? racePerkFilter : classPerkFilter}
            setNewProfDetails={setNewProfDetails}
          />
        )}

        {optionalURL && (
          <ClassLvlSelector classDetails={optionalURL && characterDetails} />
        )}
      </>
    </div>
  )
}
export default Perks
