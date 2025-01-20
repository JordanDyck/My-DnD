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
const defaultSpellSlots = [
  {name: "spells_known", value: 0},
  {name: "cantrips_known", value: 0},
  {name: "spell_slots_level_1", value: 0},
  {name: "spell_slots_level_2", value: 0},
  {name: "spell_slots_level_3", value: 0},
  {name: "spell_slots_level_4", value: 0},
  {name: "spell_slots_level_5", value: 0},
  {name: "spell_slots_level_6", value: 0},
  {name: "spell_slots_level_7", value: 0},
  {name: "spell_slots_level_8", value: 0},
  {name: "spell_slots_level_9", value: 0},
]
const LevelEditor = ({
  level,
  details,
  setDetails,
  currentLevel,
  setIsSaved,
  isSaved,
}) => {
  const [levelFeatures, setLevelFeatures] = useState([defaultFeatures])
  const [classSpecifics, setClassSpecifics] = useState([defaultclassSpecs])
  const [abilityImpovToggle, setAbilityImpovToggle] = useState(false)
  const [spellSlots, setSpellSlots] = useState(defaultSpellSlots)

  const handleSpellSlots = (value, index) => {
    setSpellSlots((prev) => {
      let slotCopy = [...prev]

      slotCopy[index].value = parseInt(value)

      return slotCopy
    })
  }
  const newFeature = (setState, defaultValues) => {
    // adds new empty object for editing in mapped div.
    setState((prev) => [...prev, defaultValues])
  }

  const saveLevel = () => {
    const savedLevel = {
      level: currentLevel,
      features: levelFeatures,
      spellcasting: spellSlots.map((slot, i) => {
        return {
          name: slot.name,
          value: slot.value,
        }
      }),

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

    setIsSaved(true)
  }

  const handleFeatureData = (e, index, state, setState, type) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    let levelCopy = [...state]

    levelCopy[index] = data

    setState(levelCopy)
  }

  return (
    <div className={level === currentLevel ? "level" : "level-collapsed"}>
      <h4>{`level ${level}`}</h4>
      {level === currentLevel && (
        <div className="ability-improv-toggle">
          <label>
            <span>Ability score+</span>
            {/* toggle to save time writing "Ability score improvement"*/}
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
                const AbilityScoreImprovement = [
                  {
                    name: "Ability Score Improvement",
                    feature: "Choose up to 2 abilities to improve",
                  },
                ]

                setAbilityImpovToggle((prev) => !prev)
                if (!abilityImpovToggle) {
                  setLevelFeatures(AbilityScoreImprovement)
                } else {
                  setLevelFeatures([defaultFeatures])
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
                  onChange={() => {}} // onChange needed to prevent errors
                  name="name"
                  placeholder="feature name"
                  value={levelFeatures[index].name}
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
            disabled={!levelFeatures[levelFeatures.length - 1].name}
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
            // at first level, create the class specific features. after that, only the values can be edited.
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
              {details.levels.map((level) => {
                // displays pre-made class_specific features from lvl 1

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
                          onFocus={(e) => e.target.select()}
                          defaultValue={feature.value}
                          onChange={(e) => {
                            // for editing the class_specific values of current level.
                            setClassSpecifics((prev) => {
                              let copy = [...prev]

                              if (!copy[i]) {
                                // if new object is empty, create object with prev class_specific values.
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
              disabled={
                !classSpecifics[classSpecifics.length - 1].name ||
                !classSpecifics[classSpecifics.length - 1].value
              }
            >
              new feature
            </button>
          ) : (
            ""
          )}
          {details.spellcasting?.spell_save?.length && (
            <div className="custom-spell-slots-container">
              <h4>spell slots</h4>
              {spellSlots.map((slot, index) => {
                return (
                  <div className="spell-slot" key={slot.name}>
                    <h4>{slot.name.replaceAll("_", " ")}</h4>
                    <input
                      onFocus={(e) => e.target.select()}
                      type="number"
                      defaultValue={
                        details?.levels[currentLevel - 2]?.spellcasting[index]
                          ?.value || 0
                      }
                      onChange={(e) => handleSpellSlots(e.target.value, index)}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      {currentLevel === level && (
        <button
          className="new-level-btn"
          onClick={saveLevel}
          style={{backgroundColor: !isSaved ? "" : "#85ff85"}}
          disabled={
            details.levels.length < 1
              ? !classSpecifics[classSpecifics.length - 1].name ||
                !classSpecifics[classSpecifics.length - 1].value
              : false
          }
        >
          {!isSaved ? "Save Level" : "Saved"}
        </button>
      )}
    </div>
  )
}

export default LevelEditor
