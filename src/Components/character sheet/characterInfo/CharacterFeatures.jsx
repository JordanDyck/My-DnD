import {useState} from "react"

import FeatureDesc from "../../FeatureDesc"

const CharacterFeatures = ({character}) => {
  const [url, setUrl] = useState()
  const levelList = character.levels.slice(0, character.currentLevel)
  let featureNameBlackList = ["Spellcasting: ", "Ability Score Improvement"]
  const getCurrentLevelFeatures = () => {
    // pulls all features up to current level & stores them in an array.
    let featureList = []
    levelList.map((lvl) => {
      return lvl.features.map((feature) => {
        if (!featureNameBlackList.some((el) => feature.name.includes(el))) {
          return (featureList = [
            ...featureList,
            {
              index: feature.index,
              name: feature.name.split(" (").shift(), // (for duplicates) removes the () to only show the name
              url: feature.url,
            },
          ])
        } else return ""
      })
    })
    return featureList.filter(
      (ele, index) =>
        index === featureList.findIndex((elem) => elem.name === ele.name)
    )
  }

  const displayLevelFeatures = () => {
    return getCurrentLevelFeatures().map((feature) => {
      return (
        <p key={feature.index} onClick={() => setUrl({name: feature.url})}>
          {feature.name}
        </p>
      )
    })
  }

  return (
    <div
      className="feature-wrapper"
      style={{pointerEvents: url ? "none" : "initial"}}
    >
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
export default CharacterFeatures
