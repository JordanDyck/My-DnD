import {useEffect} from "react"
import useCounter from "../hooks/useCounter"
const ProficiencyBonus = ({
  profName,
  skillCounter,
  setSkillCounter,
  maxChoices,
}) => {
  const count = useCounter(0, maxChoices)
  const choiceNumArray = Object.values(skillCounter)

  useEffect(() => {
    setSkillCounter((prev) => ({
      ...prev,
      [profName]: count.value,
    }))
  }, [count.value, profName, setSkillCounter])

  // adds up the count of all buttons to show total
  const totalCount = choiceNumArray.reduce(
    (total, current) => total + current,
    0
  )

  return (
    <button
      style={{
        // if max choices are reached, all buttons that didn't increase are hidden.
        display: totalCount >= maxChoices && count.value === 0 ? "none" : "",
      }}
      onClick={() => {
        // if max choices have been reached and you click again, it resets the count.
        totalCount >= maxChoices ? count.reset() : count.increment()
      }}
      name={profName}
    >
      {profName.replace("Skill:", "")} {count.value > 0 && count.value}
    </button>
  )
}
export default ProficiencyBonus
