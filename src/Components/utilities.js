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

  // desc: (value) => {
  //   return ""
  // },

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

export const handleformat = (itemValue, key) => {
  // goes through filteredInfo item values to check for arrays and objects. returns the values
  if (Array.isArray(itemValue)) {
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
