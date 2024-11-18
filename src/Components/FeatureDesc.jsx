import axios from "axios"
import {useEffect, useRef, useState} from "react"
import {useDispatch} from "react-redux"
import {RiDeleteBinLine} from "react-icons/ri"

import SpellInfo from "./SpellInfo"
import {updateCharacter} from "../Store/slices/characterSlice"

const FeatureDesc = ({
  url,
  setUrl,
  currentSpell,
  setcurrentSpell,
  character,
}) => {
  const [feature, setFeature] = useState()
  const closeRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    if (url) {
      if (url?.name.includes("/")) {
        axios.get(`https://www.dnd5eapi.co${url.name}`).then((res) => {
          const data = res.data
          setFeature(data)
        })
      } else {
        setFeature(url)
      }
    }
  }, [url])

  const deleteSpell = () => {
    const filteredSpells = character.spells.filter(
      (spell) => spell.name !== currentSpell.name
    )
    const updatedCharacter = {
      ...character,
      spells: filteredSpells,
    }
    dispatch(updateCharacter(updatedCharacter))
    setcurrentSpell()
  }

  const prepareSpell = () => {
    // take spellList and return new list with prepared spell
    // toggles currentSpell.prepared to true/false
    const preparedSpell = {...currentSpell, prepared: !currentSpell.prepared}
    //replaces spellList[currentSpell] with prepared spell
    const newSpellList = character.spells
      .filter((spell) => spell.name !== currentSpell.name)
      .concat(preparedSpell)

    const updatedCharacter = {
      ...character,
      spells: newSpellList,
    }
    dispatch(updateCharacter(updatedCharacter))
    setcurrentSpell()
  }

  useEffect(() => {
    // close FeatureDesc when clicked outside.
    let clickOutside = (e) => {
      if (!closeRef?.current?.contains(e.target)) {
        url && setUrl()
        currentSpell && setcurrentSpell()
      }
    }
    document.addEventListener("mousedown", clickOutside)
    return () => {
      document.removeEventListener("mousedown", clickOutside)
    }
  }, [closeRef, setUrl, setcurrentSpell])

  return (
    <div className="feature-container" ref={closeRef}>
      {feature && (
        <div className="feature-info">
          <header className="tab-header">{feature.name}</header>
          <h4 className="h4-title">description:</h4>
          {feature.desc.map((desc, index) => (
            <p key={`${feature.name}_${index}`}>{desc}</p>
          ))}
        </div>
      )}
      {currentSpell && (
        <button
          className="delete-spell-btn"
          onClick={() => deleteSpell()}
          style={{pointerEvents: "initial"}}
        >
          <RiDeleteBinLine />
        </button>
      )}
      {currentSpell && <SpellInfo spell={currentSpell} />}
      {currentSpell && currentSpell.level >= 1 && (
        <button
          className="perpare-spell-btn"
          onClick={() => prepareSpell()}
          style={{pointerEvents: "initial"}}
        >
          {currentSpell.prepared === false
            ? "prepare spell"
            : "unprepare spell"}
        </button>
      )}
    </div>
  )
}
export default FeatureDesc
