# `use-optimized-selector`

A React Hook to optimize a selector with a comparer. Useful in React bailing out of State updates and renders. Useful for:

- [use-context-selector](https://www.npmjs.com/package/use-context-selector)
- [use-subscription](https://www.npmjs.com/package/use-subscription)

## Check out the API Reference

- [Api Reference](./docs/API.md)

## Getting Started

Getting started is easy, but it will be good to know how [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo) works in order to confirm your selector is working as expected.

> :warning: Both the selector and comparer passed into this function must be constant or memoized in order to optimize the returned selector. Any time either of those parameters changes, a new selector will be created. In many cases, the library you're using for subscriptions will create a brand new subscription, and return a new value, uncached value when memoization is done incorrectly. This will result in less than optimal subscriptions.

> :warning: A second consequence of these optimizations is that you could over-optimize and end up with stale values if you don't take into account everything that could change! For example if there were two worlds named Earth in the examples below with different props, they would be stale when checking `planetNameComparer`! Using something generic like `react-fast-compare` for deep comparison on objects is less prone to mistakes.

### Prerequisites

To get started, you'll want to have an existing React environment, or spin up a new one with `create-react-app`, `tsdx` or other tools.

### Installing

First, install this package:

```bash
> npm install --save use-optimized-selector
```

Then import it into your JavaScript or TypeScript file:

### Using `useOptimizedSelector`

#### By itself

```js
import { useOptimizedSelector } from 'use-optimized-selector';

const helloWorldSelector = (hello) => hello?.world;
// for example, are they both Earth?
const planetNameComparer = (world1, world2) => world1?.name === world2?.name;

const MyComponent = () => {
  const hello = {
    world1: { world: { name: "Earth" } },
    world2: { world: { name: "Earth" } };

  const selector = useOptimizedSelector(helloWorldSelector, planetNameComparer);

  // world1 will be returned, because they are considered identical.
  assert(selector(hello.world1) === hello.world1);
  assert(selector(hello.world2) === hello.world1);
  assert(selector(hello.world2) !== hello.world2);

  // now when using state...
  const [state, setState] = useState(world1);

  // since selector(world2) will return identical to the current value of useState...
  useEffect(() => {
    // setState will bail out!
    setState(() => selector(world2));
  });
}
```

#### With useContextSelector

_from [TheDocs](https://github.com/dai-shi/use-context-selector)_

```js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { createContext, useContextSelector } from 'use-context-selector';
import { useOptimizedSelector } from 'use-optimized-selector';
import { isEqual } from 'react-fast-compare';

const context = createContext(null);

const StateProvider = ({ children }) => {
  const [state, setState] = useState({ count1: 0, count2: 0 });
  return (
    <context.Provider value={{state, setState}}>
      {children}
    </context.Provider>
  );
};

const selectCount1 = (value) => ({
  count1: value.state.count1,
  setState: value.setState,
});

// instead of having to useContextSelector multiple times to get multiple bits,
// we can call a deep equals function like react-fast-compare's isEqual.
const Counter1 = () => {
  const optimizedSelector = useOptimizedSelector(selectCount1, isEqual);
  const { count1, setState } = useContextSelector(context, optimizedSelector);
  const increment = () => setState(s => ({
    ...s,
    count1: s.count1 + 1,
  }));
  return (
    <div>
      <span>Count1: {count1}</span>
      <button type="button" onClick={increment}>+1</button>
      {Math.random()}
    </div>
  );
};
```

#### With Subscriptions

```js
// There's an imaginary input where a person might type "012".
// Normally, there would be 3 updates to state with different world instances in that time.
// By using useOptimizedSelector, we can make this 1 update.
const hello = {
  "0": { world: { name: "Earth" } },
  "01": { world: { name: "Earth" } },
  "012": { world: { name: "Earth" } },
}

const MyComponent = (input) => {
  const optimizedSelector = useOptimizedSelector(
    // memoize to return same function unless input changes
    useMemo(
      () => selectHelloWorld(hello[input.value]),
      [input]
    )
    // compare name of world
    planetNameComparer,
  );

  // https://github.com/facebook/react/tree/9198a5cec0936a21a5ba194a22fcbac03eba5d1d/packages/use-subscription
  const subscription = useMemo(
    () => ({
      getCurrentValue: optimizedSelector,
      subscribe: callback => {
        input.addEventListener("change", callback);
        return () => input.removeEventListener("change", callback);
      }
    }),

    // Re-subscribe any time our input changes, or the optimized selector changes
    // this shouldn't be something that happens often,
    // or you should rethink your selector
    [input, optimizedSelector]
  );

  // we'll get undefined, or a world. if typing 0, 1, 2, we'll only get one update.
  const world = useSubscription(subscription);

  return <p>{world?.name ?? "No World"}</p>;
}
```

## Authors

* [John Rom](https://johnrom.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Original Concept [@dai-shi](https://github.com/dai-shi) [useContextSelector](https://github.com/dai-shi/use-context-selector/issues/19#issuecomment-767198162)
