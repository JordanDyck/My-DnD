import {useSelector} from "react-redux"
import FeatureDesc from "../FeatureDesc"
import {useState} from "react"

const CharacterInfo = () => {
  const character = useSelector((store) => store.character.value)
  const [url, setUrl] = useState()
  const currentLevelFeatures = () => {
    const currentLvl = character.currentLevel
    const features = character.levels.slice(0, currentLvl)
    return features.map((lvl) => {
      return lvl.features.map((feature) => {
        if (!feature.name.includes("Spellcasting: ")) {
          return (
            <p key={feature.index} onClick={() => setUrl(feature.url)}>
              {feature.name}
            </p>
          )
        }
        return ""
      })
    })
  }

  return (
    <div
      className="character-info-wrapper"
      style={{pointerEvents: url ? "none" : "initial"}}
    >
      <header className="tab-header">Character info</header>
      <div className="traits-container">
        <h4 className="h4-title"> character traits:</h4>
        {character.race.traits.map((trait) => {
          return (
            <p key={trait.index} onClick={() => setUrl(trait.url)}>
              {trait.name}
            </p>
          )
        })}
      </div>
      <div className="class-abilities-container">
        <h4 className="h4-title">class abilities:</h4>
        {currentLevelFeatures()}
      </div>
      {url && (
        <div className="feature-desc-wrapper">
          <FeatureDesc url={url} setUrl={setUrl} />
        </div>
      )}
    </div>
  )
}
export default CharacterInfo
