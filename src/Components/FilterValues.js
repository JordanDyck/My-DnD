// filter
export const filter = {
  armor_class: (value) => {
    if (value.max_bonus) {
      return {
        base: `${value.base} + ${value.max_bonus}`,
      }
    } else if (value.dex_bonus === true) {
      return {
        base: `${value.base} + Dex`,
      }
    }
    return {
      base: `${value.base}`,
    }
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
  stealth_disadvantage: (value) => {
    return ""
  },
}
