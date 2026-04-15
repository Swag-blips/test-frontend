import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useDebounce } from "../../src/hooks/useDebounce";

describe("useDebounce Hook", () => {
  vi.useFakeTimers();

  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should delay updating the value", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "initial" } },
    );

    // Update the value
    rerender({ value: "updated" });

    // Value should still be 'initial' immediately after rerender
    expect(result.current).toBe("initial");

    // Fast forward halfway (250ms)
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe("initial");

    // Fast forward past the delay (501ms total)
    act(() => {
      vi.advanceTimersByTime(251);
    });
    expect(result.current).toBe("updated");
  });

  it("should reset the timer if value changes within the delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "initial" } },
    );

    // First update
    rerender({ value: "one" });

    // Fast forward 250ms
    act(() => {
      vi.advanceTimersByTime(250);
    });

    // Second update within the first delay
    rerender({ value: "two" });

    // Fast forward another 400ms (total 650ms from first update, 400ms from second)
    act(() => {
      vi.advanceTimersByTime(400);
    });

    // Still not 'two' because the timer was reset
    expect(result.current).toBe("initial");

    // Fast forward final 101ms (total 501ms from second update)
    act(() => {
      vi.advanceTimersByTime(101);
    });
    expect(result.current).toBe("two");
  });
});
