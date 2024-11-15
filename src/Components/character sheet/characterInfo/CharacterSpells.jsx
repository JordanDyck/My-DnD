import {useState} from "react"
import FeatureDesc from "../../FeatureDesc"

const CharacterSpells = ({character}) => {
  const [currentSpell, setCurrentSpell] = useState()

  const spellSave =
    8 +
    character.stats[
      character.classDetails.spellcasting.spell_save.toLowerCase()
    ].bonus +
    character.stats.int.bonus

  return (
    <div className="spell-container">
      <div className="spell-dc">
        <h4>spell save DC: {spellSave}</h4>
      </div>
      <div className="known-spells">
        <h4> spells known:</h4>
        {character.spells.map((spell) => {
          if (spell.prepared === false) {
            return (
              <button
                key={`known_${spell.name}`}
                onClick={() => {
                  setCurrentSpell(spell)
                }}
              >
                {spell.name}
              </button>
            )
          }
          return ""
        })}
      </div>
      {currentSpell && (
        <div className="feature-desc-wrapper">
          <FeatureDesc
            currentSpell={currentSpell}
            setcurrentSpell={setCurrentSpell}
            character={character}
          />
        </div>
      )}
      <div className="prepared-spells">
        <h4>prepared spells:</h4>
        {character.spells.map((preparedSpell) => {
          if (preparedSpell.prepared === true) {
            return (
              <button
                key={`prepared_${preparedSpell.name}`}
                onClick={() => setCurrentSpell(preparedSpell)}
              >
                {preparedSpell.name}
              </button>
            )
          }
          return ""
        })}
      </div>
    </div>
  )
}
export default CharacterSpells
