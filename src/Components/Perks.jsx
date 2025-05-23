import axios from "axios"
import {useEffect, useMemo} from "react"

import {classPerkFilter, racePerkFilter} from "./utilities"

import PerkFilterBlackList from "./filters/PerkFilterBlackList.json"
import PerkMap from "./PerkMap"
import ClassLvlSelector from "./ClassLvlSelector"

const Perks = ({
  category,
  subCategory,
  setStoredDetails,
  characterDetails,
  setCharacterDetails,
  newDetails,
  setNewDetails,
  linkedCharacter,
}) => {
  useEffect(() => {
    // stores the values from characterDetails to storedDetails in CharacterCreator comp to be put into localStorage
    if (category === "races") {
      setStoredDetails((prev) => ({
        ...prev,
        race: {
          name: characterDetails?.name,
          age: newDetails?.age,
          languages: characterDetails?.languages,
          speed: characterDetails?.speed,
          size: newDetails?.size,
          ability_bonus: characterDetails?.ability_bonuses,
          starting_proficiencies: characterDetails?.starting_proficiencies,
          traits: characterDetails?.traits,
          proficiencies: {
            skill_proficiencies: newDetails?.proficiency_bonus,
            ability_improvement: newDetails?.ability_improvement,
          },
          isCustom: false,
        },
      }))
    }

    if (category === "classes") {
      setStoredDetails((prev) => ({
        ...prev,
        health: newDetails?.health,
        inventory: newDetails?.starting_equipment,
        currentLevel: newDetails?.starting_level || 1,
        classDetails: {
          name: characterDetails.name,
          hit_die: characterDetails.hit_die,
          skill_proficiencies: newDetails.proficiency_bonus,
          base_proficiencies: characterDetails.proficiencies,
          saving_throws: characterDetails.saving_throws,
          spellcasting: {
            spell_save:
              characterDetails?.spellcasting?.spellcasting_ability.name,
          },
          isCustom: false,
        },
      }))
    }
  }, [category, characterDetails, newDetails, setStoredDetails])

  useEffect(() => {
    if (category && subCategory) {
      axios
        .get(`https://www.dnd5eapi.co/api/${category}/${subCategory}`)
        .then((res) => {
          const data = res.data
          const {updated_at, _id, ...rest} = data

          setCharacterDetails(rest)
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
            setNewDetails={setNewDetails}
            newDetails={newDetails}
            linkedCharacter={linkedCharacter}
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
