import {useState} from "react"
import FeatureDesc from "../../FeatureDesc"

const CharacterSpells = ({character}) => {
  const [currentSpell, setCurrentSpell] = useState()
  const spellCastingInfo =
    character.levels[character.currentLevel - 1].spellcasting
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
        <h4>
          spells known:
          <span>
            {character.spells?.length}/{spellCastingInfo.spells_known}
          </span>
        </h4>
        {character.spells.map((spell) => {
          return (
            <button
              style={{
                // change colors based on what catagory they're in.
                border: spell.prepared
                  ? "2px solid #5ed583"
                  : spell.level === 0
                  ? "2px solid #d05555ab"
                  : "1px solid #818181",
              }}
              key={`known_${spell.name}`}
              onClick={() => {
                setCurrentSpell(spell)
              }}
            >
              {spell.name}
            </button>
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
        <h4 className="h4-title">spell casting info:</h4>
        {Object.entries(spellCastingInfo).map((spellSlot) => {
          return (
            spellSlot[1] > 0 && (
              <p key={spellSlot[0]}>
                {spellSlot[0].replaceAll("_", " ")}: {spellSlot[1]}
              </p>
            )
          )
        })}
      </div>
    </div>
  )
}
export default CharacterSpells
