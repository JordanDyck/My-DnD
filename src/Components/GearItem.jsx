import {v4 as uuid} from "uuid"

const GearItem = ({title, renderedValue}) => {
  return (
    <div className={`gear-info key_${title}`} key={uuid()}>
      <h4>
        {title.replaceAll("_", " ")}
        {renderedValue ? ":" : ""}
      </h4>
      {renderedValue}
    </div>
  )
}
export default GearItem
