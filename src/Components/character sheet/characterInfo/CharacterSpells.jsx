import {useState} from "react"
import FeatureDesc from "../../FeatureDesc"

const CharacterSpells = ({character}) => {
  const [currentSpell, setCurrentSpell] = useState()

  const spellCastingInfo =
    character.levels[character.currentLevel - 1].spellcasting

  const proficiencyBonus = Math.ceil(character.currentLevel / 4) + 1 // starting at 2 and goes up every 4 levels

  const spellSave =
    8 +
    proficiencyBonus +
    character.stats[
      character.classDetails.spellcasting.spell_save.toLowerCase()
    ].bonus

  const spellAttackBonus =
    character.stats[
      character.classDetails.spellcasting.spell_save.toLowerCase()
    ].bonus + proficiencyBonus
  const spellCountFilter = character.spells.filter((spell) => spell.level !== 0)
  const cantripCountFilter = character.spells.filter(
    (spell) => spell.level === 0
  )

  const handleCustomSpellSlotData = () => {
    // turns custom character's spellCastingInfo into one Object so its the same as a normal character's spellCastingInfo.
    if (character.classDetails.isCustom) {
      return spellCastingInfo.reduce((obj, item) => {
        obj[item.name] = item.value
        return obj
      }, {})
    } else return spellCastingInfo
  }

  return (
    <div
      className="spell-container"
      style={{pointerEvents: currentSpell ? "none" : "initial"}}
    >
      <div className="spell-dc">
        <h4>
          spellcasting ability: {character.classDetails.spellcasting.spell_save}
        </h4>
        <h4>spell save dc: {spellSave}</h4>
        <h4>
          spell ATK bonus: {spellAttackBonus > 0 ? "+" : ""}
          {spellAttackBonus}
        </h4>
      </div>
      <div className="known-spells">
        <h4>spells: {spellCountFilter.length}</h4>
        {character.spells.map((spell) => {
          return (
            spell.level !== 0 && (
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
          )
        })}
      </div>
      {currentSpell && (
        <div className="feature-desc-wrapper spell-desc">
          <FeatureDesc
            currentSpell={currentSpell}
            setcurrentSpell={setCurrentSpell}
            character={character}
          />
        </div>
      )}

      <div className="cantrips">
        <h4>cantrips: {cantripCountFilter?.length}</h4>
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

      {character.spells?.length ? (
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
      ) : (
        ""
      )}
      <div className="spell-slot-container">
        <h4 className="h4-title">spell casting info:</h4>
        {Object.entries(handleCustomSpellSlotData())?.map((spellSlot) => {
          return (
            spellSlot[1] > 0 && (
              <div
                className="spell-slot"
                key={`spellSlot_name_${spellSlot[0]}`}
              >
                <h4>{spellSlot[0].replaceAll("_", " ")}:</h4>
                <p>{spellSlot[1]}</p>
              </div>
            )
          )
        })}
      </div>
    </div>
  )
}
export default CharacterSpells
