import {
  selectOptimizedSelector,
  Selector,
} from '../src/use-optimized-selector';
import {
  duplicateObject,
  firstObject,
  helloIsEqual,
  helloSelector,
  newObjectSelector,
  sameObjectSelector,
  secondObject,
  TestObject,
} from './fixtures';

describe('strict equality', () => {
  describe('strict equality: sameObjectSelector', () => {
    let optimizedSelector: Selector<TestObject, TestObject>;

    // set up new selector for each run
    beforeEach(() => {
      optimizedSelector = selectOptimizedSelector(
        sameObjectSelector,
        Object.is,
      );
    });

    test('strict equality: sameObjectSelector: returns first object when objects are equal', () => {
      const firstResult = optimizedSelector(firstObject);
      const secondResult = optimizedSelector(firstObject);

      expect(firstResult).toBe(secondResult);
      expect(secondResult).toBe(firstObject);
    });

    test('strict equality: sameObjectSelector: returns new object when objects are equivalent but not equal', () => {
      const firstResult = optimizedSelector(firstObject);
      const secondResult = optimizedSelector(duplicateObject);

      expect(firstResult).not.toBe(secondResult);
      expect(secondResult).toBe(duplicateObject);
    });

    test('strict equality: sameObjectSelector: returns new object when objects are not equivalent or equal', () => {
      const firstResult = optimizedSelector(firstObject);
      const secondResult = optimizedSelector(secondObject);

      expect(firstResult).not.toBe(secondResult);
      expect(secondResult).toBe(secondObject);
    });
  });

  describe('strict equality: newObjectSelector', () => {
    let optimizedSelector: Selector<TestObject, TestObject>;

    // set up new selector for each run
    beforeEach(() => {
      optimizedSelector = selectOptimizedSelector(newObjectSelector, Object.is);
    });

    test('strict equality: newObjectSelector: returns new object even if source objects are equal', () => {
      const firstResult = optimizedSelector(firstObject);
      const secondResult = optimizedSelector(firstObject);

      expect(firstResult).not.toBe(secondResult);
    });

    test('strict equality: newObjectSelector: returns new object when objects are equivalent but not equal', () => {
      const firstResult = optimizedSelector(firstObject);
      const secondResult = optimizedSelector(duplicateObject);

      expect(firstResult).not.toBe(secondResult);
    });

    test('strict equality: newObjectSelector: returns new object when objects are not equivalent or equal', () => {
      const firstResult = optimizedSelector(firstObject);
      const secondResult = optimizedSelector(secondObject);

      expect(firstResult).not.toBe(secondResult);
    });
  });

  describe('strict equality: helloSelector', () => {
    let optimizedSelector: Selector<TestObject, string>;

    // set up new selector for each run
    beforeEach(() => {
      optimizedSelector = selectOptimizedSelector(helloSelector, Object.is);
    });

    test('strict equality: helloSelector: returns same object if source objects are equal', () => {
      const firstResult = optimizedSelector(firstObject);
      const secondResult = optimizedSelector(firstObject);

      expect(firstResult).toBe(secondResult);
      expect(firstResult).toBe(firstObject.hello);
    });

    test('strict equality: helloSelector: returns same object when objects are equivalent but not equal', () => {
      const firstResult = optimizedSelector(firstObject);
      const secondResult = optimizedSelector(duplicateObject);

      expect(firstResult).toBe(secondResult);
      expect(firstResult).toBe(firstObject.hello);
    });

    test('strict equality: helloSelector: returns new object when objects are not equivalent or equal', () => {
      const firstResult = optimizedSelector(firstObject);
      const secondResult = optimizedSelector(secondObject);

      expect(firstResult).not.toBe(secondResult);
      expect(firstResult).toBe(firstObject.hello);
      expect(secondResult).toBe(secondObject.hello);
    });
  });
});

describe('helloIsEqual', () => {
  describe('helloIsEqual: sameObjectSelector', () => {
    let optimizedSelector: Selector<TestObject, TestObject>;

    // set up new selector for each run
    beforeEach(() => {
      optimizedSelector = selectOptimizedSelector(
        sameObjectSelector,
        helloIsEqual,
      );
    });

    // I don't think this is actually a test...
    test('helloIsEqual: sameObjectSelector: returns first object when objects are equal', () => {
      const firstResult = optimizedSelector(firstObject);
      const secondResult = optimizedSelector(firstObject);

      expect(firstResult).toBe(secondResult);
      expect(secondResult).toBe(firstObject);
    });

    test('helloIsEqual: sameObjectSelector: returns same object when objects have same hello', () => {
      const firstResult = optimizedSelector(firstObject);
      const secondResult = optimizedSelector(duplicateObject);

      expect(firstResult).toBe(secondResult);
      expect(secondResult).toBe(firstObject);
    });

    test('helloIsEqual: sameObjectSelector: returns new object when hello is not equal', () => {
      const firstResult = optimizedSelector(firstObject);
      const secondResult = optimizedSelector(secondObject);

      expect(firstResult).not.toBe(secondResult);
      expect(secondResult).toBe(secondObject);
    });
  });

  describe('helloIsEqual: newObjectSelector', () => {
    let optimizedSelector: Selector<TestObject, TestObject>;

    // set up new selector for each run
    beforeEach(() => {
      optimizedSelector = selectOptimizedSelector(
        newObjectSelector,
        helloIsEqual,
      );
    });

    test('helloIsEqual: newObjectSelector: returns same object when objects are equal', () => {
      const firstResult = optimizedSelector(firstObject);
      const secondResult = optimizedSelector(firstObject);

      expect(firstResult).toBe(secondResult);
    });

    test('helloIsEqual: newObjectSelector: returns same object when objects have same hello', () => {
      const firstResult = optimizedSelector(firstObject);
      const secondResult = optimizedSelector(duplicateObject);

      expect(firstResult).toBe(secondResult);
    });

    test('helloIsEqual: newObjectSelector: returns new object when objects do not have same hello', () => {
      const firstResult = optimizedSelector(firstObject);
      const secondResult = optimizedSelector(secondObject);

      expect(firstResult).not.toBe(secondResult);
    });
  });
});
