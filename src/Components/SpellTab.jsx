import axios from "axios"
import {useEffect, useState, useRef} from "react"
import {MdClose, MdSearch} from "react-icons/md"
import {TbArrowBack} from "react-icons/tb"

import Select from "react-select"

import SpellInfo from "./SpellInfo"
import {spellSchools} from "./utilities"

const SpellTab = ({setShowSpellTab}) => {
  const [url, setUrl] = useState({
    level: 0,
    school: "",
    spell: "",
    error: false,
  })
  const [spellInfo, setSpellInfo] = useState({})
  const [spellList, setSpellList] = useState([])
  const spellOptions = spellList.map((spell) => {
    return {value: spell.index, label: spell.name}
  })

  const spellRef = useRef(null)

  useEffect(() => {
    if (url.spell.length) {
      // gets the current spell info
      axios
        .get(`https://www.dnd5eapi.co/api/spells/${url.spell}`)
        .then((res) => {
          if (res.status === 200) {
            const data = res.data
            setSpellInfo(data)
          }
        })
        .catch((error) => {
          if (error.response.status !== 200) {
            setSpellInfo({})
            setUrl((prev) => ({
              ...prev,
              error: true,
              spell: "",
            }))
          }
        })
    }
  }, [url.spell])
  useEffect(() => {
    if (url.level && url.school) {
      // gets list of spells from school at selected level
      axios
        .get(
          `https://www.dnd5eapi.co/api/spells?level=${url.level}&school=${url.school}`
        )
        .then((res) => {
          const data = res.data.results
          setSpellList(data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [url.level, url.school])

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
                spell: spellRef.current.value
                  .toLowerCase()
                  .replaceAll(" ", "-"),
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
              spell: spellRef.current.value.toLowerCase().replaceAll(" ", "-"),
            }))
          }
        >
          <MdSearch />
        </button>

        <button
          className="search-btn"
          onClick={() => {
            setUrl((prev) => ({
              ...prev,
              spell: "",
              level: 0,
              error: false,
            }))
            setSpellInfo({})
          }}
        >
          <TbArrowBack />
        </button>

        <button
          type="button"
          className="close-spells-btn"
          onClick={() => {
            setSpellInfo({})
            setShowSpellTab((prev) => ({
              ...prev,
              spells: false,
            }))
          }}
        >
          <MdClose />
        </button>
      </div>
      {/* for looking up spells based on level and school */}
      {!url.spell.length && !url.error && (
        <div className="spell-category-container">
          <label htmlFor="spell-lvl">lvl:</label>
          <input
            type="number"
            name="spell-lvl"
            className="spell-lvl"
            defaultValue={0}
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              setUrl((prev) => ({
                ...prev,
                level: parseInt(e.target.value),
              }))
            }}
          />
          <Select
            // for getting list of schools
            className="school-selector"
            options={spellSchools}
            value={spellSchools.find((op) => {
              return op.value === url.school
            })}
            placeholder={"schools"}
            onChange={(choice) => {
              setUrl((prev) => ({
                ...prev,
                school: choice.value,
              }))
            }}
            maxMenuHeight={190}
            styles={{
              option: (base) => ({
                ...base,
                border: "1px solid #a9a9a9",
              }),
            }}
          />
          {spellList[0]?.level === url.level && (
            <Select
              // shows list of spells
              className="spell-list"
              options={spellOptions}
              onChange={(choice) => {
                setUrl((prev) => ({
                  ...prev,
                  spell: choice.value,
                }))
              }}
              maxMenuHeight={190}
              styles={{
                option: (base) => ({
                  ...base,
                  border: "1px solid #a9a9a9",
                }),
              }}
            />
          )}
        </div>
      )}
      {url.error ? (
        // incase of 404 error
        <div className="spell-info-error">
          <p>spell cannot be found. try removing/adding spaces.</p>
          <p>spells outside of 5e are not included</p>
        </div>
      ) : (
        spellInfo.name && (
          <div className="spell-info-wrapper">
            <SpellInfo spell={spellInfo} />
            <button>add spell</button>
          </div>
        )
      )}
    </div>
  )
}
export default SpellTab
