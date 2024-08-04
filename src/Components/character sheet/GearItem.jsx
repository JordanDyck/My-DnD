const GearItem = ({title, value, id}) => {
  return (
    <div
      className={`gear-info key_${title}`}
      key={`gearInfo_${title}_at_${id}`}
    >
      <h4>
        {title.replaceAll("_", " ")}
        {value ? ":" : ""}
      </h4>
      {value}
    </div>
  )
}
export default GearItem
