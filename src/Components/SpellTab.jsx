import axios from "axios"

import {useEffect, useState, useRef} from "react"
import {MdClose, MdSearch} from "react-icons/md"
import SpellInfo from "./SpellInfo"

const SpellTab = ({setShowSpellTab}) => {
  const [url, setUrl] = useState({level: 1, school: "", spell: ""})
  const [spellInfo, setSpellInfo] = useState({})
  const spellRef = useRef(null)
  useEffect(() => {
    if (url.spell.length) {
      axios
        .get(`https://www.dnd5eapi.co/api/spells/${url.spell}`)
        .then((res) => {
          try {
            const data = res.data
            setSpellInfo(data)
          } catch (error) {
            console.log(error)
          }
        })
    }
  }, [url])

  return (
    <div className="spells-tab-wrapper">
      <header className="tab-header">spell list</header>

      {/* for searching for a specific spell */}
      <div className="spell-search-container">
        <input
          className="spell-search"
          placeholder="search for spells..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setUrl((prev) => ({
                ...prev,
                spell: spellRef.current.value,
              }))
            }
          }}
          ref={spellRef}
        />
        <button
          className="search-btn"
          onClick={() =>
            setUrl((prev) => ({
              ...prev,
              spell: spellRef.current.value,
            }))
          }
        >
          <MdSearch />
        </button>
        <button
          type="button"
          className="close-spells-btn"
          onClick={() =>
            setShowSpellTab((prev) => ({
              ...prev,
              spells: false,
            }))
          }
        >
          <MdClose />
        </button>
      </div>
      {/* for looking up spells based on level and school */}
      {!url.spell.length && (
        <div className="spell-category-container">
          <label htmlFor="spell-lvl">lvl:</label>

          <input type="number" name="spell-lvl" className="spell-lvl" />
        </div>
      )}
      <div className="spell-info-wrapper">
        <SpellInfo spell={spellInfo} />
      </div>
    </div>
  )
}
export default SpellTab
