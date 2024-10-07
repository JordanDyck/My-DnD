import "./App.scss"
import {useState} from "react"
import {useSelector} from "react-redux"
import {IoMdMenu} from "react-icons/io"

import CharacterDetails from "./Components/character sheet/CharacterDetails"
import BaseStats from "./Components/character sheet/BaseStats"
import ProfStats from "./Components/character sheet/ProfStats"
import Inventory from "./Components/character sheet/Inventory"
import Gear from "./Components/Gear"
import ItemsTab from "./Components/ItemsTab"
import CharacterCreator from "./Components/character sheet/CharacterCreator"
import CharacterSelecter from "./Components/character sheet/CharacterSelecter"
import DeletePopUp from "./Components/DeletePopUp"
import SpellTab from "./Components/SpellTab"
import CharacterInfo from "./Components/character sheet/CharacterInfo"
function App() {
  const [tabs, setTabs] = useState({
    stats: false,
    gear: false,
    items: false,
    spells: false,
    creator: false,
    info: false,
  })

  const [deleteCharacterComponent, setDeleteCharacterComponent] =
    useState(false)

  const character = useSelector((store) => store.character.value)

  return (
    <div className="App">
      {!tabs.creator && (
        <CharacterSelecter
          setShowCreator={setTabs}
          deleteCharacter={setDeleteCharacterComponent}
        />
      )}
      {character && !tabs.creator && (
        <button
          className="show-character-info"
          onClick={() => {
            setTabs((prev) => ({
              ...prev,
              info: !prev.info,
            }))
          }}
        >
          <IoMdMenu />
        </button>
      )}
      {tabs.info && <CharacterInfo />}
      {!tabs.creator && character && (
        <CharacterDetails showSkillsTab={setTabs} />
      )}
      {tabs.creator && (
        <div className="character-info-container">
          <CharacterCreator setShowCreator={setTabs} />
        </div>
      )}
      {deleteCharacterComponent && (
        <div className="delete-character-wrapper">
          <DeletePopUp showDeleteComponent={setDeleteCharacterComponent} />
        </div>
      )}

      {character && !tabs.creator && (
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
      )}

      {tabs.items && <ItemsTab type={"items-tab"} setShowItemTab={setTabs} />}

      {tabs.spells && <SpellTab setShowSpellTab={setTabs} />}

      {tabs.stats && <ProfStats setShowStats={setTabs} />}

      {tabs.gear && <Gear />}

      {character && !tabs.creator && <BaseStats />}
      {character && !tabs.creator && <Inventory />}
    </div>
  )
}

export default App
