export class ObjectOperators {
  /** @returns a deep copy of the @param `obj` */
  static deepCopy<Type>(obj: Type): Type {
    let copy

    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' != typeof obj) return obj

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date()
      copy.setTime(obj.getTime())
      return copy as unknown as Type
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = []
      let objEl
      for (let i = 0, len = obj.length; i < len; i++) {
        objEl = obj[i]
        copy[i] = ObjectOperators.deepCopy<typeof objEl>(objEl)
      }
      return copy as unknown as Type
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {}
      for (const attr in obj) {
        if ((obj as Object).hasOwnProperty(attr)) copy[attr] = ObjectOperators.deepCopy(obj[attr])
      }
      return copy as Type
    }

    throw new Error("Unable to copy obj! Its type isn't supported.")
  }

  static deepOverride<Type>(overridingObj: Type, overriddenObj: Type): Type {
    // Handle the 3 simple types, and null or undefined
    if (null == overridingObj || 'object' != typeof overridingObj) return overridingObj

    // Handle Date
    if (overridingObj instanceof Date) {
      const copy: Date = overriddenObj ? (overriddenObj as unknown as Date) : new Date()
      copy.setTime(overridingObj.getTime())
      return copy as unknown as Type
    }

    // Handle Array
    if (overridingObj instanceof Array) {
      const copy: any[] = overriddenObj ? (overriddenObj as unknown as []) : []
      for (let i = 0, len = overridingObj.length; i < len; i++) {
        copy[i] = ObjectOperators.deepOverride(overridingObj[i], copy[i])
      }
      return copy as unknown as Type
    }

    // Handle Object
    if (overridingObj instanceof Object) {
      const copy: Object = overriddenObj ? (overriddenObj as Object) : {}
      // let attr: keyof typeof Object;
      for (const attr in overridingObj) {
        if ((overridingObj as any).hasOwnProperty(attr))
          copy[attr] = ObjectOperators.deepOverride(overridingObj[attr], copy[attr])
      }
      return copy as unknown as Type
    }

    throw new Error("Unable to copy obj! Its type isn't supported.")
  }
}
