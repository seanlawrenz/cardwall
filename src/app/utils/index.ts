import { findIndex } from 'lodash';

export const uniqueValuesInArray = (arr: Array<any>) => {
  const seen = {};
  const out = [];
  const len = arr.length;
  let j = 0;
  for (let i = 0; i < len; i++) {
    const item = arr[i];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
};

export const uniqueCollectionsInCollection = (array: Array<any>, key: string): Array<any> => {
  const result = [];
  const map = new Map();
  for (const item of array) {
    if (!map.has(item[key])) {
      map.set(item[key], true);
      result.push(item);
    }
  }
  return result;
};

/**
 * Finds an object on array via identifer and updates data
 */
export const updateDataOnCollection = (targetArray: any[], identifier: number, dataToReplaceWith: any, id: string): Array<any> => {
  const index = findIndex(targetArray, item => item[id] === identifier);
  if (index !== -1) {
    return [...targetArray.slice(0, index), dataToReplaceWith, ...targetArray.slice(index + 1)];
  } else {
    return targetArray;
  }
};

/**
 * Sanitize string for string comparison
 * @param {string} text
 */
export const sanitizeString = (text: string) => text.toLowerCase().trim();

export * from './relativeMoveCardId';
export * from './cardMoveOperations';
export * from './card-color-reducer';
export * from './custom-validators';
