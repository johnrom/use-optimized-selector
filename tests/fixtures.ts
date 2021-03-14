import { Comparer } from '../src';

export type TestObject = {
  hello: string;
};

export const firstObject: TestObject = {
  hello: 'world',
};
export const duplicateObject: TestObject = {
  hello: 'world',
};
export const secondObject: TestObject = {
  hello: 'universe',
};

export const sameObjectSelector = (value: TestObject): TestObject => value;
export const newObjectSelector = (value: TestObject): TestObject => ({
  ...value,
});
export const helloSelector = (value: TestObject): string => value.hello;
export const helloIsEqual: Comparer<TestObject> = (prevValue, nextValue) =>
  prevValue.hello === nextValue.hello;
