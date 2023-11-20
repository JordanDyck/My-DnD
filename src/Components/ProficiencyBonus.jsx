import {useEffect} from "react"
import useCounter from "../hooks/useCounter"
const ProficiencyBonus = ({
  profName,
  skillCounter,
  setSkillCounter,
  maxChoices,
  setNewProfDetails,
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
  const totalCount = (itemToCount) => {
    return itemToCount.reduce((total, current) => total + current, 0)
  }

  // only returns skills > 0.
  useEffect(() => {
    Object.entries(skillCounter).forEach((skill) => {
      if (skill[1] > 0) {
        return setNewProfDetails((prev) => ({
          ...prev,
          [skill[0]]: skill[1],
        }))
      }
    })
  }, [skillCounter, setNewProfDetails])

  return (
    <button
      style={{
        // if max choices are reached, all buttons that didn't increase are hidden.
        display:
          totalCount(choiceNumArray) >= maxChoices && count.value === 0
            ? "none"
            : "",
      }}
      onClick={() => {
        // if max choices have been reached and you click again, it resets the count.
        totalCount(choiceNumArray) >= maxChoices
          ? count.reset()
          : count.increment()
      }}
      name={profName}
      value={count.value}
    >
      {profName.replace("Skill:", "")} {count.value > 0 && `+ ${count.value}`}
    </button>
  )
}
export default ProficiencyBonus
