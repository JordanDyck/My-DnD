import {useSelector} from "react-redux"

const CharacterInfo = () => {
  const character = useSelector((store) => store.character.value)

  const currentLevelFeatures = () => {
    const currentLvl = character.currentLevel
    const features = character.levels.slice(0, currentLvl)
    return features.map((lvl) => {
      return lvl.features.map((feature) => {
        return <p key={feature.index}>{feature.name}</p>
      })
    })
  }

  return (
    <div className="character-info-wrapper">
      <header className="tab-header">Character info</header>
      <div className="feats-container">
        <h4 className="h4-title"> character traits:</h4>
        {character.race.traits.map((trait) => {
          return <p key={trait.index}>{trait.name}</p>
        })}
      </div>
      <div className="level-container">
        <h4 className="h4-title"> current level features:</h4>
        {currentLevelFeatures()}
      </div>
    </div>
  )
}
export default CharacterInfo
