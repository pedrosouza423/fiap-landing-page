import { render, screen, act } from "@testing-library/react";
import { Navbar } from "./Navbar";

describe("Navbar component", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  it("renders logo image with correct alt", () => {
    render(<Navbar />);

    const logo = screen.getByAltText("FIAP");
    expect(logo).toBeInTheDocument();
  });

  it("does not add scrolled class initially", () => {
    const { container } = render(<Navbar />);

    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();

    expect(header?.className).not.toContain("scrolled");
  });

  it("adds scrolled class when page is scrolled beyond 40px", () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 41, writable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(header?.className).toContain("scrolled");
  });

  it("removes scrolled class when scroll goes back to <= 40px", () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 60, writable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header?.className).toContain("scrolled");

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 40, writable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header?.className).not.toContain("scrolled");
  });
});
