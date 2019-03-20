import { find } from 'lodash';

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
export const updateDataOnCollection = (targetArray: any[], identifier: number, dataToReplaceWith: any) =>
  Object.assign({}, find(targetArray, target => target.id === identifier), dataToReplaceWith);

export * from './relativeMoveCardId';
export * from './cardMoveOperations';
export * from './card-color-reducer';
