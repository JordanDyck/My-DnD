const StartingSpellSlots = () => {
  return (
    <div className="starting-spells">
      <h4 className="h4-title">starting spells:</h4>
      <label htmlFor="cantrips">
        cantrips known:
        <input className="spell-input" type="number" name="cantrips" />
      </label>
      <label htmlFor="spellSlots">
        spellSlots:
        <input className="spell-input" type="number" name="spellslots" />
      </label>
      <label htmlFor="spells">
        spells known:
        <input className="spell-input" type="number" name="spells" />
      </label>
    </div>
  )
}
export default StartingSpellSlots
