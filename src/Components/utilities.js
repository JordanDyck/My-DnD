import {isValidElement} from "react"

export const filter = {
  armor_class: (value) => {
    if (value.max_bonus) {
      return `${value.base} +  dex (max of ${value.max_bonus})`
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
        return element.ability_score.name + ` +${element.bonus}`
      })
      .join(", ")
    return abilitybonus
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
      return element.name.replaceAll("Skill: ", "")
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
}

export const classLvlFilter = {
  features: (value) => {
    const features = value.map((feature) => {
      return feature.name
    })

    return features.length ? features : "none"
  },

  class_specific: (value) => {
    return Object.entries(value).map((item) => {
      if (item[1] > 0) {
        return `${item[0].replaceAll("_", " ")}: ${
          item[0].includes("die") ? "D" : ""
        }${item[1]}`
      } else {
        return ""
      }
    })
  },

  spellcasting: (value) => {
    const spells = Object.entries(value).map((spell) => {
      return `${spell[0].replaceAll("_", " ")}: ${spell[1]}`
    })
    return spells
  },
}

export const spellFilter = {
  school: (value) => {
    return value.name
  },
  classes: (value) => {
    return value.map((v) => v.name)
  },
  damage: (value) => {
    return {
      damage_type: value.damage_type.name,
      higher_level:
        value.damage_at_slot_level || value.damage_at_character_level,
    }
  },
  dc: (value) => {
    return {
      dc_success: value.dc_success,
      dc_type: value.dc_type.name,
    }
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
      <p className={key} key={`item_${itemValue}`}>
        {itemValue}
      </p>
    )
  } else if (typeof itemValue === "boolean") {
    return itemValue.toString()
  } else if (Object.keys(itemValue)?.length) {
    const keys = Object.keys(itemValue)

    return keys.map((value, index) => {
      // this returns just the value keys
      return (
        <div
          className={`item-value key_${keys[index]}`}
          key={`item_${key}${[index]}`}
        >
          <h4 className="h4-title">{value.replaceAll("_", " ")}:</h4>
          {handleformat(itemValue[value])}
        </div>
      )
    })
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

export const spellSchools = [
  {value: "abjuration", label: "abjuration"},
  {value: "conjuration", label: "conjuration"},
  {value: "divination", label: "divination"},
  {value: "enchantment", label: "enchantment"},
  {value: "evocation", label: "evocation"},
  {value: "illusion", label: "illusion"},
  {value: "necromancy", label: "necromancy"},
  {value: "transmutation", label: "transmutation"},
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
    borderBlock: "1px solid grey",
  }),

  menuList: (base) => ({
    overflow: "auto",
    ...base,
    padding: "0",
    height: "220px",
    width: "160px",
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
