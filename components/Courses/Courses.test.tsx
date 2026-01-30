import { render, screen, fireEvent } from "@testing-library/react";

import { Courses } from "./Courses";

jest.mock("gsap", () => {
  const timeline = jest.fn(() => {
    const api: unknown = {
      to: jest.fn(() => api),
      add: jest.fn((cb?: unknown) => {
        if (typeof cb === "function") cb();
        return api;
      }),
    };
    return api;
  });

  return {
    __esModule: true,
    default: {
      killTweensOf: jest.fn(),
      set: jest.fn(),
      to: jest.fn(),
      fromTo: jest.fn(),
      timeline,
    },
  };
});

beforeAll(() => {
  global.requestAnimationFrame = (cb: FrameRequestCallback) => {
    cb(0);
    return 0 as unknown as number;
  };

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion") ? false : false,
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

describe("Courses component", () => {
  it("renders main title and subtitle", () => {
    render(<Courses />);

    expect(
      screen.getByRole("heading", { level: 2, name: /cursos/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/cursos de curta duração/i)).toBeInTheDocument();
  });

  it("starts with Tecnologia category active", () => {
    render(<Courses />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Tecnologia" })
    ).toBeInTheDocument();

    expect(screen.getByText("Big Data Ecosystem")).toBeInTheDocument();
  });

  it("changes category when clicking Inovação tab", async () => {
    render(<Courses />);

    const inovacaoTab = screen.getByRole("button", { name: "Inovação" });
    fireEvent.click(inovacaoTab);

    // troca é assíncrona por causa da animação → usa findByRole
    expect(
      await screen.findByRole("heading", { level: 3, name: "Inovação" })
    ).toBeInTheDocument();

    // itens de Inovação (do mock)
    expect(screen.getByText("UX")).toBeInTheDocument();
    expect(screen.getByText("UX Writing")).toBeInTheDocument();
  });

  it("changes category when clicking Negócios tab", async () => {
    render(<Courses />);

    const negociosTab = screen.getByRole("button", { name: "Negócios" });
    fireEvent.click(negociosTab);

    expect(
      await screen.findByRole("heading", { level: 3, name: "Negócios" })
    ).toBeInTheDocument();

    expect(screen.getByText("Agile Culture")).toBeInTheDocument();
    expect(screen.getByText("Growth Hacking")).toBeInTheDocument();
  });

  it("marks active tab visually", async () => {
    render(<Courses />);

    const tecnologia = screen.getByRole("button", { name: "Tecnologia" });
    const inovacao = screen.getByRole("button", { name: "Inovação" });

    // começa com Tecnologia ativa
    expect(tecnologia.className).toMatch(/active/);

    fireEvent.click(inovacao);

    await screen.findByRole("heading", { level: 3, name: "Inovação" });

    expect(inovacao.className).toMatch(/active/);
  });
});
