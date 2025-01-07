import {useState} from "react"
import Switch from "react-switch"

const defaultFeatures = {
  name: "",
  feature: "",
}
const defaultclassSpecs = {
  name: "",
  value: "",
}
const LevelEditor = ({
  level,
  details,
  setDetails,
  currentLevel,
  setDisableNewLevel,
}) => {
  const [levelFeatures, setLevelFeatures] = useState([defaultFeatures])
  const [classSpecifics, setClassSpecifics] = useState([defaultclassSpecs])
  const [abilityImpovToggle, setAbilityImpovToggle] = useState(false)

  const newFeature = (setState, defaultValues) => {
    // adds new empty object for editing in mapped div.
    setState((prev) => [...prev, defaultValues])
    setDisableNewLevel(true)
  }

  const saveLevel = () => {
    // issue: remakes all levels with only the current classSpecifics,

    const savedLevel = {
      level: currentLevel,
      features: levelFeatures,
      class_specific:
        details?.levels?.length > 1
          ? details?.levels?.[0]?.class_specific.map((trait, index) => {
              return {
                name: details?.levels?.[0]?.class_specific?.[index]?.name,
                value:
                  classSpecifics[index]?.value ||
                  details?.levels?.[currentLevel - 1]?.class_specific?.[index]
                    ?.value,
              }
            })
          : classSpecifics,
    }

    if (currentLevel === level) {
      setDetails((prev) => {
        const levelsCopy = [...prev.levels]
        levelsCopy[currentLevel - 1] = savedLevel
        return {
          ...prev,
          levels: levelsCopy,
        }
      })
    }
  }

  const handleFeatureData = (e, index, state, setState, type) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    let levelCopy = [...state]

    levelCopy[index] = data

    setState(levelCopy)

    if (data.featureName) {
      setDisableNewLevel(false)
    } else setDisableNewLevel(true)
  }

  return (
    <div className={level === currentLevel ? "level" : "level-collapsed"}>
      <h4>{`level ${level}`}</h4>
      {level === currentLevel && (
        <div className="ability-improv-toggle">
          <label>
            <span>Ability score+</span>
            {/* the toggle btn */}
            <Switch
              className="toggle-switch"
              onColor="#4ae173"
              onHandleColor="#6dff79"
              handleDiameter={29}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              width={60}
              height={30}
              onChange={() => {
                const AbilityScoreImprovement = {
                  [`level_${level}`]: [
                    {
                      featureName: "Ability score improvement",
                      feature: "Choose up to 2 abilities to improve",
                    },
                  ],
                }
                const defaultFeature = {[`level_${level}`]: [{featureName: ""}]}

                setAbilityImpovToggle((prev) => !prev)
                if (!abilityImpovToggle) {
                  setLevelFeatures((prev) => ({
                    ...prev,
                    ...AbilityScoreImprovement,
                  }))
                  setDetails((prev) => ({
                    ...prev,
                    levels: {
                      ...prev.levels,
                      ...AbilityScoreImprovement,
                    },
                  }))
                  setDisableNewLevel(false)
                } else {
                  setLevelFeatures((prev) => ({
                    ...prev,
                    ...defaultFeature,
                  }))
                  setDetails((prev) => ({
                    ...prev,
                    levels: {
                      ...prev.levels,
                      ...defaultFeature,
                    },
                  }))
                  setDisableNewLevel(true)
                }
              }}
              checked={abilityImpovToggle}
            />
          </label>
        </div>
      )}

      <div className="level-wrapper">
        {levelFeatures.map((_, index) => {
          return (
            <form
              className="level-feature"
              key={`feature_${index + 1}`}
              onChange={(e) =>
                handleFeatureData(
                  e,
                  index,
                  levelFeatures,
                  setLevelFeatures,
                  "features"
                )
              }
            >
              {level === currentLevel ? (
                <input
                  // onChange={() => {}} // onChange needed to prevent errors
                  name="name"
                  placeholder="feature name"
                  // value={levelInfo[`level_${level}`][index]?.featureName}
                  readOnly={abilityImpovToggle}
                />
              ) : (
                <p>{levelFeatures[index].name}</p>
              )}
              {!abilityImpovToggle && (
                <textarea
                  name="feature"
                  placeholder="description..."
                  style={{display: level !== currentLevel ? "none" : "initial"}}
                />
              )}
            </form>
          )
        })}
        {!abilityImpovToggle && (
          <button
            className="new-feature-btn"
            type="button"
            onClick={() => newFeature(setLevelFeatures, defaultFeatures)}
            style={{display: level !== currentLevel ? "none" : "initial"}}
            // disabled={
            //   levelInfo[`level_${level}`][
            //     levelInfo[`level_${level}`].length - 1
            //   ].featureName === ""
            // }
          >
            new feature
          </button>
        )}
        <div
          className="custom-class-specifics"
          style={{display: level !== currentLevel ? "none" : "flex"}}
        >
          <h4>class specific features:</h4>
          {currentLevel === 1 ? (
            <div>
              <span>
                *The class features that level up with you. ex: Rage count, Ki
                points, Sorcery points, bardic inspiration. Only the values
                change on level up.
              </span>
              {classSpecifics.map((_, index) => {
                return (
                  <form
                    className="class-spec-creator"
                    key={`class-specifics_${index + 1}`}
                    onChange={(e) =>
                      handleFeatureData(
                        e,
                        index,
                        classSpecifics,
                        setClassSpecifics,
                        "class_specific"
                      )
                    }
                  >
                    <input
                      className="class-spec-name"
                      name="name"
                      placeholder="Name..."
                    />
                    <input
                      className="class-spec-value"
                      name="value"
                      placeholder="Val"
                    />
                  </form>
                )
              })}
            </div>
          ) : (
            <div className="custom-class-spec-lvl-container">
              {details.levels.map((level, index) => {
                // display set class_specific features

                return level.class_specific.map((feature, i) => {
                  if (level.level === currentLevel) {
                    return (
                      <div
                        className="custom-class-specifics-editor"
                        key={`class_specific_level_${level.level}_${i}`}
                      >
                        <h4 key={feature.name}>{feature.name}</h4>
                        <input
                          key={`class_specific_value_${i}`}
                          name="value"
                          defaultValue={feature.value}
                          onChange={(e) => {
                            // for editing the class_specific values of current level.
                            setClassSpecifics((prev) => {
                              let copy = [...prev]

                              if (!copy[i]) {
                                copy[i] = {
                                  name: details.levels[currentLevel - 2]
                                    .class_specific[i].name,
                                  value:
                                    details.levels[currentLevel - 2]
                                      .class_specific[i].value,
                                }
                              }
                              copy[i].value =
                                e.target.value ||
                                details.levels[currentLevel - 2].class_specific[
                                  i
                                ].value

                              return copy
                            })
                          }}
                        />
                      </div>
                    )
                  } else return ""
                })
              })}
            </div>
          )}

          {currentLevel === 1 ? (
            <button
              className="new-feature-btn"
              type="button"
              onClick={() =>
                newFeature(setClassSpecifics, {name: "", value: ""})
              }
              style={{display: level !== currentLevel ? "none" : "initial"}}
              // disabled={
              //   levelInfo[`level_${level}`][
              //     levelInfo[`level_${level}`].length - 1
              //   ].featureName === ""
              // }
            >
              new feature
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      {currentLevel === level && (
        <button className="new-level-btn" onClick={saveLevel}>
          save level
        </button>
      )}
    </div>
  )
}

export default LevelEditor
