// filter
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

  range: (value) => {
    if (value.normal && !value.long) {
      return `${value.normal}ft`
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
