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
    <div
      className="spell-container"
      style={{pointerEvents: currentSpell ? "none" : "initial"}}
    >
      <div className="spell-dc">
        <h4>spell save DC: {spellSave}</h4>
      </div>
      <div className="known-spells">
        <h4> spells known:</h4>
        {character.spells.map((spell) => {
          return (
            spell.level >= 1 && (
              <button
                key={`known_${spell.name}`}
                onClick={() => {
                  setCurrentSpell(spell)
                }}
                disabled={spell.prepared === true}
              >
                {spell.name}
              </button>
            )
          )
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
      <div className="cantrips">
        <h4>cantrips:</h4>
        {character.spells.map((cantrip) => {
          if (cantrip.level === 0) {
            return (
              <button
                key={`cantrip_${cantrip.name}`}
                onClick={() => setCurrentSpell(cantrip)}
              >
                {cantrip.name}
              </button>
            )
          }
          return ""
        })}
      </div>
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
      <div className="spell-slots">
        {Object.entries(
          character.levels[character.currentLevel - 1].spellcasting
        ).map((spellSlot) => {
          return (
            <p key={spellSlot[0]}>
              {spellSlot[0].replaceAll("_", " ")}: {spellSlot[1]}
            </p>
          )
        })}
      </div>
    </div>
  )
}
export default CharacterSpells
