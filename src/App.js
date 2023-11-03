import "./App.scss"
import {useState} from "react"

import CharacterDetails from "./Components/character sheet/CharacterDetails"
import BaseStats from "./Components/character sheet/BaseStats"
import ProfStats from "./Components/character sheet/ProfStats"
import Inventory from "./Components/character sheet/Inventory"
import Gear from "./Components/Gear"
import ItemsTab from "./Components/ItemsTab"
import CharacterCreator from "./Components/character sheet/CharacterCreator"
import CharacterSelecter from "./Components/character sheet/CharacterSelecter"
function App() {
  const [showStats, setShowStats] = useState(false)
  const [showGear, setShowGear] = useState(false)
  const [showItems, setShowItems] = useState(false)
  const [showCreator, setShowCreator] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState("")

  return (
    <div className="App">
      {!showCreator && (
        <CharacterSelecter
          setSelectedCharacter={setSelectedCharacter}
          setShowCreator={setShowCreator}
        />
      )}

      {!showCreator && selectedCharacter && (
        <CharacterDetails
          setShowCreator={setShowCreator}
          selectedCharacter={selectedCharacter}
        />
      )}
      {showCreator && (
        <div className="character-info-container">
          <CharacterCreator setShowCreator={setShowCreator} />
        </div>
      )}

      <div className="category-tabs">
        <button
          className="category-btn"
          onClick={() => setShowStats(!showStats)}
        >
          stats
        </button>

        <button className="category-btn" onClick={() => setShowGear(!showGear)}>
          Gear
        </button>
        <button
          className="category-btn"
          onClick={() => setShowItems(!showItems)}
        >
          ItemList
        </button>
      </div>

      {showItems && <ItemsTab />}

      {showStats && (
        <ProfStats showStats={showStats} setShowStats={setShowStats} />
      )}

      {showGear && <Gear />}

      <BaseStats />
      <Inventory />
    </div>
  )
}

export default App
