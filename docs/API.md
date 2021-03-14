
<a name="readmemd"></a>

use-optimized-selector

# use-optimized-selector

## Table of contents

### Type aliases

- [Comparer](#comparer)
- [Selector](#selector)

### Functions

- [useOptimizedSelector](#useoptimizedselector)

## Type aliases

### Comparer

Ƭ **Comparer**<Return\>: (`prev`: Return, `next`: Return) => *boolean*

A memoized or constant function in the form of:

`(prevValue, nextValue) => boolean`

Return true when objects are considered equivalent.

#### Type parameters:

Name |
:------ |
`Return` |

#### Type declaration:

▸ (`prev`: Return, `next`: Return): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`prev` | Return |
`next` | Return |

**Returns:** *boolean*

Defined in: [use-optimized-selector.ts:22](https://github.com/johnrom/use-optimized-selector/blob/f978f43/src/use-optimized-selector.ts#L22)

___

### Selector

Ƭ **Selector**<Value, Return\>: (`value`: Value) => Return

A memoized or constant function in the form of:

`(sourceValue) => derivedValue`

#### Type parameters:

Name |
:------ |
`Value` |
`Return` |

#### Type declaration:

▸ (`value`: Value): Return

#### Parameters:

Name | Type |
:------ | :------ |
`value` | Value |

**Returns:** Return

Defined in: [use-optimized-selector.ts:13](https://github.com/johnrom/use-optimized-selector/blob/f978f43/src/use-optimized-selector.ts#L13)

## Functions

### useOptimizedSelector

▸ `Const`**useOptimizedSelector**<Value, Return\>(`selector`: [*Selector*](#selector)<Value, Return\>, `comparer?`: [*Comparer*](#comparer)<Return\>): [*Selector*](#selector)<Value, Return\>

A hook that caches the value of a selector given an optional comparer.

It will return the previous value when present and comparer returns true,
bailing out of setState and consequent renders.

Useful for optimizing selectors for useContextSelector, useSubscriptions, useMutableSource, etc.

#### Type parameters:

Name |
:------ |
`Value` |
`Return` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`selector` | [*Selector*](#selector)<Value, Return\> | A memoized or constant selector   |
`comparer` | [*Comparer*](#comparer)<Return\> | A memoized or constant comparer    |

**Returns:** [*Selector*](#selector)<Value, Return\>

Defined in: [use-optimized-selector.ts:60](https://github.com/johnrom/use-optimized-selector/blob/f978f43/src/use-optimized-selector.ts#L60)
