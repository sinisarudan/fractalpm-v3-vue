/**
 * safely handles circular references
 * @param {*} obj
 * @param {number} indent
 * @returns
 *
 * Example: `console.log('options', JSON.safeStringify(options))`
 */
export const JSONsafeStringify = (obj, indent = 2) => {
  let cache = [];
  const retVal = JSON.stringify(
    obj,
    (key, value) =>
      typeof value === 'object' && value !== null
        ? cache.includes(value)
          ? undefined // Duplicate reference found, discard key
          : cache.push(value) && value // Store value in our collection
        : value,
    indent
  );
  cache = null;
  return retVal;
};
