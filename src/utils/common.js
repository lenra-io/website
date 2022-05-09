/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
 function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge source objects in a target one.
 * @param target The target of the merge
 * @param ...sources The objects to merge in the target
 */
function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();
  
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], source[key]);
        }
        else if (Array.isArray(target[key]) && Array.isArray(source[key])) {
          [].push.apply(target[key], source[key])
        }
        else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
  
    return mergeDeep(target, ...sources);
  }

exports.mergeDeep = mergeDeep;