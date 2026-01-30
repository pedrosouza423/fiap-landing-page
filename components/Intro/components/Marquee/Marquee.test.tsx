import { render, screen } from "@testing-library/react";
import type { Mock } from "jest-mock";

function createMockTween() {
  return {
    timeScale: jest.fn(),
    kill: jest.fn(),
  };
}

let mockTopTween: ReturnType<typeof createMockTween>;
let mockBottomTween: ReturnType<typeof createMockTween>;

jest.mock("gsap", () => {
  const fromTo = jest.fn((..._args: unknown[]) => {
    if (!mockTopTween) {
      mockTopTween = createMockTween();
      return mockTopTween;
    }

    if (!mockBottomTween) {
      mockBottomTween = createMockTween();
      return mockBottomTween;
    }

    return createMockTween();
  });

  return {
    __esModule: true,
    default: {
      registerPlugin: jest.fn(),
      set: jest.fn(),
      context: (fn: () => void, _scope?: unknown) => {
        fn();
        return { revert: jest.fn() };
      },
      fromTo,
      to: jest.fn(),
      utils: {
        clamp: (_min: number, _max: number, v: number) => v,
      },
    },
  };
});

jest.mock("gsap/ScrollTrigger", () => {
  return {
    __esModule: true,
    ScrollTrigger: {
      create: jest.fn(() => ({ kill: jest.fn(), vars: {} })),
      getAll: jest.fn(() => []),
    },
  };
});

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Marquee } from "./Marquee";

describe("Marquee (GSAP)", () => {
  beforeEach(() => {
    mockTopTween = undefined as unknown as ReturnType<typeof createMockTween>;
    mockBottomTween = undefined as unknown as ReturnType<typeof createMockTween>;

    jest.clearAllMocks();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("renders default variant content", () => {
    const { container } = render(
      <Marquee variant="default" borderMode="bottom" />
    );

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute("data-variant", "default");
    expect(root).toHaveAttribute("data-border", "bottom");

    expect(
      screen.getAllByText(/CURSOS E IMERSÕES\. UMA NOVA CULTURA DE MERCADO\./i)
        .length
    ).toBeGreaterThan(0);

    expect(gsap.registerPlugin).not.toHaveBeenCalled();
    expect(gsap.fromTo).not.toHaveBeenCalled();
    expect(gsap.set).not.toHaveBeenCalled();
  });

  it("renders scroll variant content (two lines) and wires ScrollTrigger configs into tweens", () => {
    const { container } = render(<Marquee variant="scroll" borderMode="none" />);

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute("data-variant", "scroll");
    expect(root).toHaveAttribute("data-border", "none");

    const lines = container.querySelectorAll('[class*="scrollLine"]');
    expect(lines.length).toBe(2);

    expect(screen.getAllByText(/SKILLS/i).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/MUITO ALÉM DOS TUTORIAIS/i).length
    ).toBeGreaterThan(0);

    expect(gsap.registerPlugin).toHaveBeenCalledWith(ScrollTrigger);

    expect(gsap.set).toHaveBeenCalledTimes(1);

    expect((gsap.fromTo as Mock).mock.calls.length).toBeGreaterThanOrEqual(2);

    const calls = (gsap.fromTo as Mock).mock.calls;

    const topVars = calls[0]?.[2] as { scrollTrigger?: unknown };
    const bottomVars = calls[1]?.[2] as { scrollTrigger?: unknown };

    expect(topVars.scrollTrigger).toBeTruthy();
    expect(bottomVars.scrollTrigger).toBeTruthy();
  });
});
