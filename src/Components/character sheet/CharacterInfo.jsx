import {useSelector} from "react-redux"
import {useState} from "react"

import FeatureDesc from "../FeatureDesc"

const CharacterInfo = () => {
  const character = useSelector((store) => store.character.value)
  const [url, setUrl] = useState()
  const levelList = character.levels.slice(0, character.currentLevel)
  let featureNameBlackList = [
    "Spellcasting: ",
    "Ability Score Improvement",
    " (d",
  ]
  const getCurrentLevelFeatures = () => {
    // pulls all features up to current level & stores them in an array.
    let featureList = []
    levelList.map((lvl) => {
      return lvl.features.map((feature) => {
        if (!featureNameBlackList.some((el) => feature.name.includes(el))) {
          return featureList.push(feature)
        } else return ""
      })
    })
    return featureList
  }

  const displayLevelFeatures = () => {
    //removes duplicate features
    const uniqueFeatureList = [
      ...new Map(getCurrentLevelFeatures().map((el) => [el.name, el])).values(),
    ]

    return uniqueFeatureList.map((feature) => {
      return (
        <p key={feature.index} onClick={() => setUrl({name: feature.url})}>
          {feature.name}
        </p>
      )
    })
  }

  return (
    <div
      className="character-info-wrapper"
      style={{pointerEvents: url ? "none" : "initial"}}
    >
      <header className="tab-header">Character info</header>
      <div className="traits-container">
        <h4 className="h4-title"> Race traits:</h4>
        {/*  race traits */}
        {character.race.traits.map((trait) => {
          return (
            <p key={trait.index} onClick={() => setUrl({name: trait.url})}>
              {trait.name}
            </p>
          )
        })}
      </div>
      <div className="class-abilities-container">
        {/* class features */}
        <h4 className="h4-title">class abilities:</h4>
        {displayLevelFeatures()}
      </div>

      <div className="class-specifics">
        {/* class_specific features */}
        {Object.entries(
          character.levels[character.currentLevel - 1].class_specific
        ).map((feature) => {
          return (
            feature[1] > 0 && (
              <p key={feature}>
                {feature[0].replaceAll("_", " ")}:
                {feature[0].includes("_die") ? " D" : " "}
                {feature[1]}
              </p>
            )
          )
        })}
      </div>
      <div className="subclass-abilities">
        <h4 className="h4-title">subclass features</h4>
        {/* subclass features */}
        {character.subClass.features.map((item) => {
          if (
            parseInt(item.level) <= character.currentLevel &&
            !item.featureName.includes("Ability score improvement")
          ) {
            return (
              <p
                key={item.featureName}
                onClick={() => {
                  item.feature?.length &&
                    setUrl({name: item.featureName, desc: [item.feature]})
                }}
              >
                {item.featureName}
              </p>
            )
          } else return ""
        })}
      </div>
      {Object.entries(character.classDetails.spellcasting).length ? (
        <div className="spell-casting">
          {/* spellcasting */}
          <h4 className="h4-title">spellcasting:</h4>
          {Object.entries(
            character.levels[character.currentLevel - 1].spellcasting
          ).map((spell) => {
            return (
              spell[1] > 0 && (
                <p key={spell[0]}>
                  {spell[0].replaceAll("_", " ")}: {spell[1]}
                </p>
              )
            )
          })}
        </div>
      ) : (
        ""
      )}
      {url && (
        <div className="feature-desc-wrapper">
          <FeatureDesc url={url} setUrl={setUrl} />
        </div>
      )}
    </div>
  )
}
export default CharacterInfo
