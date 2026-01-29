import { render, screen } from "@testing-library/react";
import { Marquee } from "./Marquee";

describe("Marquee", () => {
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
    ).toBeGreaterThanOrEqual(1);

    expect(
      screen.getAllByText(
        /TECNOLOGIA, INOVAÇÃO E NEGÓCIOS\. PRESENTE E FUTURO\./i
      ).length
    ).toBeGreaterThanOrEqual(1);
  });

  it("renders scroll variant content", () => {
    const { container } = render(
      <Marquee variant="scroll" borderMode="none" />
    );

    const root = container.firstChild as HTMLElement;

    expect(root).toHaveAttribute("data-variant", "scroll");
    expect(root).toHaveAttribute("data-border", "none");

    expect(screen.getAllByText(/SKILLS/i).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText(/MUITO ALÉM DOS TUTORIAIS/i).length
    ).toBeGreaterThanOrEqual(1);
  });

  it("does not start scroll effect when variant is default", () => {
    const rafSpy = jest.spyOn(window, "requestAnimationFrame");

    render(<Marquee variant="default" />);

    expect(rafSpy).not.toHaveBeenCalled();

    rafSpy.mockRestore();
  });

  it("applies translateX on scroll variant based on scroll progress", () => {
    // Controla RAF sem loop: guardamos callbacks numa fila e executamos manualmente
    const rafQueue: FrameRequestCallback[] = [];

    const rafSpy = jest
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb: FrameRequestCallback) => {
        rafQueue.push(cb);
        return rafQueue.length; // id qualquer
      });

    const cancelSpy = jest
      .spyOn(window, "cancelAnimationFrame")
      .mockImplementation(() => {});

    // Mock do getBoundingClientRect (viewport)
    const rectMock = jest
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockReturnValue({
        top: 0,
        height: 200,
        bottom: 200,
        left: 0,
        right: 0,
        width: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      } as DOMRect);

    // Define viewport height
    Object.defineProperty(window, "innerHeight", {
      value: 800,
      writable: true,
    });

    const { container } = render(<Marquee variant="scroll" />);

    const track = container.querySelector('[class*="scrollTrack"]') as HTMLElement;
    expect(track).toBeInTheDocument();

    // 1º frame (antes de scrollWidth real)
    expect(rafQueue.length).toBeGreaterThanOrEqual(1);
    rafQueue.shift()!(0);

    // Agora setamos scrollWidth (JSDOM não calcula layout)
    Object.defineProperty(track, "scrollWidth", {
      value: 1000,
      configurable: true,
    });

    // 2º frame (recalcula com scrollWidth correto)
    expect(rafQueue.length).toBeGreaterThanOrEqual(1);
    rafQueue.shift()!(16);

    // progress = (800 - 0) / (800 + 200) = 0.8
    // maxShift = 1000 * 0.5 = 500
    // x = -500 * 0.8 = -400px
    expect(track.style.transform).toBe("translateX(-400px)");

    rafSpy.mockRestore();
    cancelSpy.mockRestore();
    rectMock.mockRestore();
  });
});
