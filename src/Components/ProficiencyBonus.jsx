import {useCallback, useEffect} from "react"

import useCounter from "../hooks/useCounter"
const ProficiencyBonus = ({
  profName,
  skillCounter,
  category,
  setSkillCounter,
  maxChoices,
  setNewProfDetails,
}) => {
  const count = useCounter(0, maxChoices)

  // updates skillCounter with profNames and new values
  useEffect(() => {
    setSkillCounter((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [profName]: count.value,
      },
    }))
  }, [count.value, profName, setSkillCounter, category])

  // adds up the count of all buttons to show total
  const totalCount = useCallback(() => {
    if (skillCounter[category]) {
      return Object.values(skillCounter[category]).reduce(
        (total, current) => total + current,
        0
      )
    } else return 0
  }, [skillCounter, category])
  // takes all skills and if their count is > 0, puts them in newProfDetails to be stored in local storage.
  useEffect(() => {
    if (skillCounter?.[category]) {
      Object.entries(skillCounter[category]).forEach((skill) => {
        const isMax = totalCount() >= maxChoices ? true : false
        setNewProfDetails((prev) => ({
          ...prev,
          [category]: {
            ...prev?.[category],
            [skill[0]]: skill[1],
            maxChoicesReached: isMax,
          },
        }))
      })
    }
  }, [skillCounter, category, setNewProfDetails, maxChoices, totalCount])

  return (
    <button
      style={{
        // if max choices are reached, all buttons that didn't increase are hidden.
        display: totalCount() >= maxChoices && count.value === 0 ? "none" : "",
      }}
      onClick={() => {
        // if max choices have been reached and you click again, it resets the count.
        totalCount() >= maxChoices ? count.reset() : count.increment()
      }}
      name={profName}
      value={count.value}
    >
      {profName.replace("Skill:", "")} {count.value > 0 && `+ ${count.value}`}
    </button>
  )
}
export default ProficiencyBonus
