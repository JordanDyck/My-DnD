import axios from "axios"
import {useEffect, useMemo} from "react"

import {classPerkFilter, racePerkFilter} from "./utilities"

import PerkFilterBlackList from "./PerkFilterBlackList.json"
import PerkMap from "./PerkMap"
import ClassLvlSelector from "./ClassLvlSelector"

const Perks = ({
  category,
  subCategory,
  setStoredDetails,
  characterDetails,
  setCharacterDetails,
  newProfDetails,
  setNewProfDetails,
}) => {
  useEffect(() => {
    // stores the values from characterDetails to storedDetails in CharacterCreator component to be put into localStorage
    if (category === "races") {
      setStoredDetails((prev) => ({
        ...prev,
        race: {
          name: characterDetails.name,
          languages: characterDetails.languages,
          speed: characterDetails.speed,
          starting_proficiencies: characterDetails.starting_proficiencies,
          traits: characterDetails.traits,

          // ...characterDetails,
          // ability_bonus_options: {
          //   ...newProfDetails.ability_bonus_options,
          //   maxProfs: characterDetails?.ability_bonus_options?.choose,
          // },
          // starting_proficiency_options: {
          //   ...newProfDetails.starting_proficiency_options,
          //   maxProfs: characterDetails?.starting_proficiency_options?.choose,
          // },
        },
      }))
    }

    if (category === "classes") {
      const {subclasses, index, ...detailsCopy} = characterDetails
      setStoredDetails((prev) => ({
        ...prev,
        classDetails: {
          ...detailsCopy,
          proficiency_choices: newProfDetails.proficiency_choices,
        },
      }))
    }
  }, [category, characterDetails, newProfDetails, setStoredDetails])

  useEffect(() => {
    if (category && subCategory) {
      axios
        .get(`https://www.dnd5eapi.co/api/${category}/${subCategory}`)
        .then((res) => {
          const data = res.data

          setCharacterDetails(data)
        })
    }
  }, [category, subCategory, setCharacterDetails])

  const filteredRaceDetails = useMemo(() => {
    return Object.entries(characterDetails).filter((value) => {
      if (!PerkFilterBlackList.base.includes(value[0])) {
        return true
      }

      return false
    })
  }, [characterDetails])

  return (
    <div className="perk-wrapper">
      <>
        {
          <PerkMap
            filteredRaceDetails={filteredRaceDetails}
            perkFilter={category === "races" ? racePerkFilter : classPerkFilter}
            setNewProfDetails={setNewProfDetails}
            newProfDetails={newProfDetails}
          />
        }

        {category === "classes" && (
          <ClassLvlSelector
            levelsURL={characterDetails.class_levels}
            setStoredDetails={setStoredDetails}
          />
        )}
      </>
    </div>
  )
}
export default Perks
