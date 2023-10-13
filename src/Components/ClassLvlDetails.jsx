const ClassLvlDetails = ({perk}) => {
  return (
    <div>
      <h4> proficency bonus: {perk.prof_bonus}</h4>

      {perk.features.length > 0 && <h4>features:</h4>}

      {perk.features.map((feature) => {
        return <p key={feature.name}>{feature.name}</p>
      })}
      <h4>class specifics:</h4>
      {Object.entries(perk.class_specific).map((specific, index) => {
        return (
          specific[1] > 0 && (
            <p key={"specific_" + specific + index}>
              {specific[0].replaceAll("_", " ")}: {specific[1]}
            </p>
          )
        )
      })}
      {perk.spellcasting && <h4>SpellCasting</h4>}
      {perk.spellcasting &&
        Object.entries(perk.spellcasting).map((spellcasting) => {
          return (
            spellcasting[1] > 0 && (
              //spellcasting level and number
              <p key={"spellcasting_" + spellcasting[0]}>
                {spellcasting[0].replaceAll("_", " ")}: {spellcasting[1]}
              </p>
            )
          )
        })}
    </div>
  )
}
export default ClassLvlDetails
