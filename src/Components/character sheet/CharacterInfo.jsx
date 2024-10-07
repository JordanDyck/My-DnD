import {useSelector} from "react-redux"

const CharacterInfo = () => {
  const character = useSelector((store) => store.character.value)

  return (
    <div className="character-info-wrapper">
      <header className="tab-header">Character info</header>
      <div className="feats-container">
        <h4 className="h4-title"> character traits:</h4>
        {character.race.traits.map((trait) => {
          return <p key={trait.index}>{trait.name}</p>
        })}
      </div>
    </div>
  )
}
export default CharacterInfo
