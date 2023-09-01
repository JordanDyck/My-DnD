import {v4 as uuid} from "uuid"

const GearItem = ({title, value}) => {
  return (
    <div className={`gear-info key_${title}`} key={uuid()}>
      <h4>
        {title.replaceAll("_", " ")}
        {value ? ":" : ""}
      </h4>
      {value}
    </div>
  )
}
export default GearItem
