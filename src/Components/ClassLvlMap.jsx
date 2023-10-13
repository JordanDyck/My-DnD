// import {useMemo} from "react"
import {useState} from "react"
import ClassLvlDetails from "./ClassLvlDetails"
// import PerkFilterBlackList from "./PerkFilterBlackList.json"
// import {handleformat} from "./utilities"
// import {classLvlFilter} from "./utilities"
import {RxDropdownMenu} from "react-icons/rx"
const ClassLvlMap = ({classDetails}) => {
  // const [classStorage, setClassStorage] = useState()
  const [activeDetails, setActiveDetails] = useState({})
  const showDetails = (level) => {
    setActiveDetails((prev) => ({
      ...prev,
      [level]: !prev[level], // <-- update value by index key
    }))
  }

  return classDetails.map((perk) => {
    return (
      <div className="class-perk-container" key={"level_" + perk.level}>
        <button className="class-level" onClick={() => showDetails(perk.level)}>
          <RxDropdownMenu /> level: {perk.level}
        </button>
        <div
          className={
            activeDetails[perk.level]
              ? "class-level-perks displayed"
              : "class-level-perks"
          }
        >
          <ClassLvlDetails perk={perk} />
        </div>
      </div>
    )
  })
}
export default ClassLvlMap
