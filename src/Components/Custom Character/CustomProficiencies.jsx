const CustomProficiencies = ({array, updateDetails, ObjKey}) => {
  // creates a new input on btn click used for storing lists of data like languages or traits
  return (
    <div className={`custom-proficiencies ${ObjKey}`}>
      {array.map((_, index) => {
        return (
          <input
            name="proficiency"
            key={`${ObjKey}_${[index]}`}
            onChange={(e) => {
              const data = [...array]
              data[index] = e.target.value

              updateDetails((prev) => ({
                ...prev,
                [ObjKey]: data,
              }))
            }}
          />
        )
      })}
      <button
        onClick={() => {
          updateDetails((prev) => ({
            ...prev,
            [ObjKey]: [...prev[ObjKey], ""],
          }))
        }}
        disabled={!array[array.length - 1]}
      >
        +
      </button>
    </div>
  )
}
export default CustomProficiencies
