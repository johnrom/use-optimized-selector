import {
  sameObjectSelector,
  helloIsEqual,
  newObjectSelector,
} from './fixtures';
import {
  Comparer,
  Selector,
  useOptimizedSelector,
} from '../src/use-optimized-selector';
import { renderHook } from '@testing-library/react-hooks';

const renderUseSelector = <Value, Result>(
  selector: Selector<Value, Result>,
  comparer?: Comparer<Result>,
) => {
  return renderHook<
    {
      selector: Selector<Value, Result>;
      comparer?: Comparer<Result>;
    },
    {
      selector: Selector<Value, Result>;
    }
  >(
    (props) => ({
      selector: useOptimizedSelector(props.selector, props.comparer),
    }),
    {
      initialProps: { selector, comparer },
    },
  );
};

describe('useOptimizedSelector', () => {
  describe('no change', () => {
    test("uses memoized selector when using default comparer and selector doesn't change", () => {
      const { result, rerender } = renderUseSelector(sameObjectSelector);

      rerender();

      const firstSelector =
        !(result.all[0] instanceof Error) && result.all[0].selector;
      const secondSelector =
        !(result.all[1] instanceof Error) && result.all[1].selector;

      expect(firstSelector).toBe(secondSelector);
    });

    test("uses memoized selector whether or not specifying default comparer and selector doesn't change", () => {
      const { result, rerender } = renderUseSelector(sameObjectSelector);

      rerender({
        selector: sameObjectSelector,
        comparer: Object.is,
      });

      const firstSelector =
        !(result.all[0] instanceof Error) && result.all[0].selector;
      const secondSelector =
        !(result.all[1] instanceof Error) && result.all[1].selector;

      expect(firstSelector).toBe(secondSelector);
    });

    test("uses memoized selector when using custom comparer and selector doesn't change", () => {
      const { result, rerender } = renderUseSelector(
        sameObjectSelector,
        helloIsEqual,
      );

      rerender({
        selector: sameObjectSelector,
        comparer: helloIsEqual,
      });

      const firstSelector =
        !(result.all[0] instanceof Error) && result.all[0].selector;
      const secondSelector =
        !(result.all[1] instanceof Error) && result.all[1].selector;

      expect(firstSelector).toBe(secondSelector);
    });
  });

  describe('changes', () => {
    test('uses new selector when selector changes', () => {
      const { result, rerender } = renderUseSelector(sameObjectSelector);

      rerender({
        selector: newObjectSelector,
      });

      const firstSelector =
        !(result.all[0] instanceof Error) && result.all[0].selector;
      const secondSelector =
        !(result.all[1] instanceof Error) && result.all[1].selector;

      expect(firstSelector).not.toBe(secondSelector);
    });

    test('uses new selector when comparer changes', () => {
      const { result, rerender } = renderUseSelector(sameObjectSelector);

      rerender({
        selector: sameObjectSelector,
        comparer: helloIsEqual,
      });

      const firstSelector =
        !(result.all[0] instanceof Error) && result.all[0].selector;
      const secondSelector =
        !(result.all[1] instanceof Error) && result.all[1].selector;

      expect(firstSelector).not.toBe(secondSelector);
    });
  });
});
