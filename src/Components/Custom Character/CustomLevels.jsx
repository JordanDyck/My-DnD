const CustomLevels = ({setDetails, details}) => {
  const updateFormData = (index, e) => {
    let data = [...details.levels]
    data[index][e.target.name] = e.target.value

    setDetails((prev) => ({
      ...prev,
      levels: data,
    }))
  }

  const addFeature = () => {
    let defaultLevelData = {
      feature: "",
      featureName: "",
      level: "",
    }
    setDetails((prev) => ({
      ...prev,
      levels: [...details.levels, defaultLevelData],
    }))
  }

  return (
    <div className="Levels-container">
      {details.levels.map((_, index) => {
        return (
          <div key={index} className="level">
            <input
              onChange={(e) => updateFormData(index, e)}
              name="level"
              placeholder="lvl"
              value={details.levels.level}
            />
            <input
              onChange={(e) => updateFormData(index, e)}
              name="featureName"
              placeholder="feature name"
              value={details.levels.featureName}
            />
            <input
              onChange={(e) => updateFormData(index, e)}
              name="feature"
              placeholder="description "
              value={details.levels.feature}
            />
          </div>
        )
      })}
      <button type="button" onClick={() => addFeature()}>
        Add new level
      </button>
    </div>
  )
}
export default CustomLevels
