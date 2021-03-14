/**
 * Used in https://github.com/formium/formik/pull/3089/files
 * Based on https://github.com/dai-shi/use-context-selector/issues/19#issuecomment-767198162
 * Gist: https://gist.github.com/johnrom/4e8bc65110c689006663c7736539e892
 */
import { useMemo } from 'react';

/**
 * A memoized or constant function in the form of:
 *
 * `(sourceValue) => derivedValue`
 */
export type Selector<Value, Return> = (value: Value) => Return;

/**
 * A memoized or constant function in the form of:
 *
 * `(prevValue, nextValue) => boolean`
 *
 * Return true when objects are considered equivalent.
 */
export type Comparer<Return> = (prev: Return, next: Return) => boolean;

const UNINITIALIZED_VALUE = Symbol();

/**
 * @internal
 */
export const selectOptimizedSelector = <Value, Return>(
  selector: Selector<Value, Return>,
  comparer: Comparer<Return>,
): Selector<Value, Return> => {
  let cachedValue: Return | typeof UNINITIALIZED_VALUE = UNINITIALIZED_VALUE;

  return (value: Value) => {
    const newValue = selector(value);

    if (
      cachedValue === UNINITIALIZED_VALUE ||
      !comparer(cachedValue, newValue)
    ) {
      cachedValue = newValue;
    }

    return cachedValue;
  };
};

/**
 * A hook that caches the value of a selector given an optional comparer.
 *
 * It will return the previous value when present and comparer returns true,
 * bailing out of setState and consequent renders.
 *
 * Useful for optimizing selectors for useContextSelector, useSubscriptions, useMutableSource, etc.
 *
 * @param selector A memoized or constant selector
 * @param comparer A memoized or constant comparer
 */
export const useOptimizedSelector = <Value, Return>(
  selector: Selector<Value, Return>,
  comparer: Comparer<Return> = Object.is,
): Selector<Value, Return> => {
  return useMemo(() => selectOptimizedSelector(selector, comparer), [
    comparer,
    selector,
  ]);
};
