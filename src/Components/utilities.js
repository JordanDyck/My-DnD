import {isValidElement} from "react"
import {v4 as uuid} from "uuid"

export const filter = {
  armor_class: (value) => {
    if (value.max_bonus) {
      return `${value.base} + ${value.max_bonus}`
    } else if (value.dex_bonus === true) {
      return `${value.base} + Dex`
    }
    return `${value.base}`
  },

  cost: (value) => {
    return `${value.quantity} ${value.unit}`
  },

  equipment_category: (value) => {
    return value.name
  },

  gear_category: (value) => {
    return value.name
  },

  rarity: (value) => {
    return value.name
  },

  damage: (value) => {
    return `${value.damage_dice} ${value.damage_type.name}`
  },

  two_handed_damage: (value) => {
    return `${value.damage_dice} ${value.damage_type.name}`
  },

  stealth_disadvantage: () => {
    return ""
  },

  id: () => {
    return ""
  },

  range: (value) => {
    if (value.normal && !value.long) {
      return {
        normal: `${value.normal}ft`,
      }
    } else if (value.long && !value.normal) {
      return {
        long: `${value.long}ft`,
      }
    } else if (value.normal && value.long) {
      return {
        normal: `${value.normal}ft`,
        long: `${value.long}ft`,
      }
    }
  },
}

export const racePerkFilter = {
  ability_bonuses: (value) => {
    const abilitybonus = value
      .map((element) => {
        return element.ability_score.name
      })
      .join(", ")
    return `${abilitybonus} + ${value[0].bonus}`
  },

  languages: (value) => {
    const langFilter = value
      .map((element) => {
        return element.name
      })
      .join(", ")

    return langFilter
  },
  subraces: (value) => {
    const sub = value
      .map((element) => {
        return element.name
      })
      .join(", ")
    return sub
  },
  starting_proficiencies: (value) => {
    const prof = value.map((element) => {
      return element.name
    })
    return prof.length ? prof : "none"
  },

  traits: (value) => {
    const trait = value
      .map((element) => {
        return element.name
      })
      .join(", ")
    return trait.length ? trait : "none"
  },
}

export const classPerkFilter = {
  hit_die: (value) => {
    return "D" + value
  },

  proficiencies: (value) => {
    const prof = value.map((element) => {
      if (element.name.includes("Saving Throw:")) {
        return ""
      }
      return element.name
    })
    return prof
  },

  saving_throws: (value) => {
    const throws = value
      .map((element) => {
        return element.name
      })
      .join(", ")
    return throws
  },
  starting_equipment: (value) => {
    const startingEquipment = value.map((element) => {
      const quantity = element.quantity
      if (quantity > 1) {
        return `${element.equipment.name} (${quantity})`
      } else return element.equipment.name
    })
    return startingEquipment
  },
  starting_equipment_options: (value) => {
    const choice = value.map((choices) => {
      return (
        <div className="gear-choices" key={uuid()}>
          <b>Choose {choices.choose}:</b>
          <p>
            {choices.desc
              .replace("(a)", "")
              .replace("(b)", "")
              .replace("(c)", "")
              .replace(" or ", " | OR | ")}
          </p>
        </div>
      )
    })

    return choice
  },
}

export const classLvlFilter = {
  features: (value) => {
    const features = value.map((feature) => {
      return feature.name
    })

    return features
  },

  spellcasting: (value) => {
    const spells = Object.entries(value).map((spell) => {
      if (spell[1] > 0) {
        return `${spell[0].replaceAll("_", " ")}: ${spell[1]} spell(s)`
      } else {
        return ""
      }
    })
    return spells
  },
}

// goes through api item values to sort through arrays and objects. returns the values so they can be mapped and displayed
export const handleformat = (itemValue, key) => {
  // if element has a different div tag, display it
  if (isValidElement(itemValue)) {
    return itemValue
  } else if (Array.isArray(itemValue)) {
    return itemValue.map((item) => handleformat(item))
  } else if (
    (typeof itemValue === "string" && itemValue.length) ||
    typeof itemValue === "number"
  ) {
    // returns the value
    return (
      <p className={key} key={uuid()}>
        {itemValue}
      </p>
    )
  } else if (typeof itemValue === "boolean") {
    return itemValue.toString()
  } else if (Object.keys(itemValue)?.length) {
    const keys = Object.keys(itemValue)
    return keys.map((value) => (
      // this returns just the value keys
      <div className="item-value" key={uuid()}>
        <h4>{value}:</h4>
        {handleformat(itemValue[value])}
      </div>
    ))
  } else {
    return ""
  }
}

export const damageTypes = [
  {value: "Slashing", label: "Slashing"},
  {value: "Piercing", label: "Piercing"},
  {value: "Bludgeoning", label: "Bludgeoning"},
  {value: "Poison", label: "Poison"},
  {value: "Acid", label: "Acid"},
  {value: "Fire", label: "Fire"},
  {value: "Cold", label: "Cold"},
  {value: "Radiant", label: "Radiant"},
  {value: "Necrotic", label: "Necrotic"},
  {value: "Lightning", label: "Lightning"},
  {value: "Thunder", label: "Thunder"},
  {value: "Force", label: "Force"},
  {value: "Psychic", label: "Psychic"},
]

export const armorStyles = {
  control: (base, {isDisabled, isFocused}) => ({
    ...base,
    border: isFocused ? "2px solid orange" : "none",
    borderBottom: "2px solid",
    borderRadius: "0",
    boxShadow: "none",
    textAlign: "center",
    width: "245px",
    height: "35px",
    fontSize: "17px",
    top: "-8px",
    color: isDisabled ? "#d9d9d9" : "black",
    backgroundColor: isDisabled ? "transparent" : "white",
  }),
  option: (base, state) => ({
    ...base,
    textAlign: "center",
    backgroundColor: state.isSelected ? "lightgrey" : "white",
    color: "black",
    margin: "0",
    borderBlock: "0.2px solid grey",
  }),
  menuList: (base) => ({
    ...base,
    padding: "0",
  }),

  menu: (base) => ({
    ...base,
    border: "1px solid",
    marginTop: "-5px",
    height: "119px",
  }),
}

export const weaponStyles = {
  control: (base, {isDisabled, isFocused}) => ({
    ...base,
    border: isFocused ? "2px solid orange" : "none",

    borderBottom: "2px solid",
    borderRadius: "0",
    marginLeft: "17px",
    textAlign: "center",
    maxWidth: "137px",
    minWidth: "115px",
    height: "32px",
    minHeight: "32px",
    fontSize: "14px",
    top: "-5px",
    color: isDisabled ? "#d9d9d9" : "black",
    backgroundColor: isDisabled ? "transparent" : "transparent",
  }),

  option: (base, state) => ({
    ...base,
    margin: "0",
    backgroundColor: state.isSelected ? "lightgrey" : "white",
    color: "black",
    borderBlock: "0.2px solid grey",
  }),

  menuList: (base) => ({
    ...base,
    padding: "0",
    height: "220px",
  }),

  menu: (base) => ({
    ...base,
    top: "21px",
    left: "0px",
    textAlign: "center",
    width: "150px",
  }),
}

export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    alert("Error in local storage.")
  }
}
