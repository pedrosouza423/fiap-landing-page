import { render, screen, act } from "@testing-library/react";
import { Navbar } from "./Navbar";
import styles from "./Navbar.module.scss";

describe("Navbar component", () => {
  beforeEach(() => {
    // garante scrollY mutável
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });

    // mock scrollTo pra atualizar scrollY
    Object.defineProperty(window, "scrollTo", {
      value: (_x: number, y: number) => {
        Object.defineProperty(window, "scrollY", { value: y, writable: true });
      },
      writable: true,
    });
  });

  it("renders logo image with correct alt", () => {
    render(<Navbar />);
    expect(screen.getByAltText("FIAP")).toBeInTheDocument();
  });

  it("does not add scrolled class initially (top of the page)", () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();

    expect(header).not.toHaveClass(styles.scrolled);
  });

  it("adds scrolled class when page is scrolled (> 0)", () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();

    act(() => {
      window.scrollTo(0, 1);
      window.dispatchEvent(new Event("scroll"));
    });

    expect(header).toHaveClass(styles.scrolled);
  });

  it("removes scrolled class when scroll goes back to top (0)", () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();

    act(() => {
      window.scrollTo(0, 120);
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header).toHaveClass(styles.scrolled);

    act(() => {
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header).not.toHaveClass(styles.scrolled);
  });
});
