// import {useMemo} from "react"
// import {useState} from "react"
// import PerkFilterBlackList from "./PerkFilterBlackList.json"
// import {handleformat} from "./utilities"
// import {classLvlFilter} from "./utilities"

const ClassLvlMap = ({classDetails}) => {
  // const [classStorage, setClassStorage] = useState()
  return classDetails.map((ele) => {
    return (
      <div className="class-perk-container" key={"level_" + ele.level}>
        <h4>level: {ele.level}</h4>
        <h4> proficency bonus: {ele.prof_bonus}</h4>

        {ele.features.length > 0 && <h4>features:</h4>}

        {ele.features.map((feature) => {
          return <p key={feature.name}>{feature.name}</p>
        })}
        <h4>class specifics:</h4>
        {Object.entries(ele.class_specific).map((specific) => {
          return (
            specific[1] > 0 && (
              <p>
                {specific[0].replaceAll("_", " ")}: {specific[1]}
              </p>
            )
          )
        })}
        {ele.spellcasting && <h4>SpellCasting</h4>}
        {ele.spellcasting &&
          Object.entries(ele.spellcasting).map((spellcasting) => {
            return (
              spellcasting[1] > 0 && (
                //spellcasting level and number
                <p>
                  {spellcasting[0].replaceAll("_", " ")}: {spellcasting[1]}
                </p>
              )
            )
          })}
      </div>
    )
  })
}
export default ClassLvlMap
