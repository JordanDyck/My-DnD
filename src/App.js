import "./App.scss"
import {useState} from "react"

import CharacterDetails from "./Components/character sheet/CharacterDetails"
import BaseStats from "./Components/character sheet/BaseStats"
import ProfStats from "./Components/character sheet/ProfStats"
import Inventory from "./Components/character sheet/Inventory"
import Gear from "./Components/Gear"
import ItemsTab from "./Components/ItemsTab"

function App() {
  // const [showCharDetails, setShowCharDetails] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showGear, setShowGear] = useState(false)
  const [showItems, setShowItems] = useState(false)

  return (
    <div className="App">
      <CharacterDetails />

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

      {/* {showCharDetails && (
        <ClassDetails raceName={raceName} setRaceName={setRaceName} />
      )} */}

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
