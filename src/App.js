import "./styles/Global.scss"
import {useState} from "react"
import {useSelector} from "react-redux"

import CharacterDetails from "./Components/character sheet/CharacterDetails"
import BaseStats from "./Components/character sheet/BaseStats"
import Inventory from "./Components/character sheet/Inventory"
import Gear from "./Components/Gear"
import ItemsTab from "./Components/ItemsTab"
import CharacterCreator from "./Components/character sheet/CharacterCreator"
import CharacterSelecter from "./Components/character sheet/CharacterSelecter"
import DeletePopUp from "./Components/DeletePopUp"
import SpellTab from "./Components/SpellTab"

function App() {
  const [tabs, setTabs] = useState({
    gear: false,
    items: false,
    spells: false,
    creator: false,
    info: false,
  })

  const [deleteCharacterComponent, setDeleteCharacterComponent] = useState(false)

  const character = useSelector((store) => store.character.value)
  const currentCharacter = localStorage.getItem("currentCharacter")

  return (
    <div className="App">
      {!tabs.creator && (
        <CharacterSelecter
          setShowCreator={setTabs}
          deleteCharacter={setDeleteCharacterComponent}
          charInfo={tabs.info}
        />
      )}

      {!tabs.creator && currentCharacter && character && <CharacterDetails />}
      {tabs.creator && (
        <div className="character-creator-wrapper">
          <CharacterCreator setShowCreator={setTabs} />
        </div>
      )}
      {deleteCharacterComponent && (
        <div className="delete-character-wrapper">
          <DeletePopUp showDeleteComponent={setDeleteCharacterComponent} />
        </div>
      )}

      {currentCharacter && character?.characterName && !tabs.creator ? (
        <div className="category-tabs">
          <button
            className="category-btn"
            onClick={() =>
              setTabs((prev) => ({
                ...prev,
                gear: !prev.gear,
              }))
            }
          >
            Equipped
          </button>
          <button
            className="category-btn"
            onClick={() =>
              setTabs((prev) => ({
                ...prev,
                items: !prev.items,
              }))
            }
          >
            Item List
          </button>
          <button
            className="category-btn"
            onClick={() =>
              setTabs((prev) => ({
                ...prev,
                spells: !prev.spells,
              }))
            }
          >
            Spell List
          </button>
        </div>
      ) : (
        ""
      )}

      {tabs.items && <ItemsTab type={"items-tab"} setShowItemTab={setTabs} />}

      {tabs.spells && <SpellTab setShowSpellTab={setTabs} />}

      {tabs.gear && <Gear />}

      {currentCharacter && character.characterName && !tabs.creator && <BaseStats />}
      {currentCharacter && character?.inventory && !tabs.creator ? <Inventory /> : ""}
    </div>
  )
}

export default App
