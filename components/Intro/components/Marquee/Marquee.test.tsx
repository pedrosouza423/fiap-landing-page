import { render, screen } from "@testing-library/react";
import type { Mock } from "jest-mock";

// Função normal (hoisted)
function createMockTween() {
  return {
    timeScale: jest.fn(),
    kill: jest.fn(),
  };
}

// IMPORTANT: usar let/var, porque jest.mock é hoisted
let mockTopTween: ReturnType<typeof createMockTween>;
let mockBottomTween: ReturnType<typeof createMockTween>;

jest.mock("gsap", () => {
  const fromTo = jest.fn((..._args: unknown[]) => {
    // retorna top na 1ª chamada, bottom na 2ª, e depois cria novos (segurança)
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
    // reseta refs entre testes
    mockTopTween = undefined as unknown as ReturnType<typeof createMockTween>;
    mockBottomTween = undefined as unknown as ReturnType<typeof createMockTween>;

    jest.clearAllMocks();
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

    // default NÃO deve iniciar ScrollTrigger
    expect(ScrollTrigger.create).not.toHaveBeenCalled();
  });

  it("renders scroll variant content (two lines) and creates ScrollTrigger", () => {
    const { container } = render(<Marquee variant="scroll" borderMode="none" />);

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute("data-variant", "scroll");
    expect(root).toHaveAttribute("data-border", "none");

    // duas linhas existem (dois tracks)
    const lines = container.querySelectorAll('[class*="scrollLine"]');
    expect(lines.length).toBe(2);

    expect(screen.getAllByText(/SKILLS/i).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/MUITO ALÉM DOS TUTORIAIS/i).length
    ).toBeGreaterThan(0);

    // GSAP loop criado
    expect((gsap.fromTo as Mock).mock.calls.length).toBeGreaterThanOrEqual(2);

    // ScrollTrigger criado
    expect(ScrollTrigger.create).toHaveBeenCalledTimes(1);
  });
});
