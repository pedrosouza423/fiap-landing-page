import { render, screen, fireEvent } from "@testing-library/react";
import { FAQ } from "./FAQ";

import itemStyles from "./Item/FaqItem.module.scss";

describe("FAQ component", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: query.includes("(hover: hover)") ? true : false,
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

  it("renders title and subtitle", () => {
    render(<FAQ />);
    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("Dúvidas Frequentes")).toBeInTheDocument();
  });

  it("does not start with any item active", () => {
    render(<FAQ />);

    const item = screen.getByTestId("faq-item-multi-cursos");
    expect(item).not.toHaveClass(itemStyles.active);
  });

  it("adds active class on hover and removes on mouse leave", () => {
    render(<FAQ />);

    const item = screen.getByTestId("faq-item-multi-cursos");

    fireEvent.mouseEnter(item);
    expect(item).toHaveClass(itemStyles.active);

    fireEvent.mouseLeave(item);
    expect(item).not.toHaveClass(itemStyles.active);
  });

  it("shows only one item active at a time", () => {
    render(<FAQ />);

    const itemA = screen.getByTestId("faq-item-multi-cursos");
    const itemB = screen.getByTestId("faq-item-matricula");

    fireEvent.mouseEnter(itemA);
    expect(itemA).toHaveClass(itemStyles.active);
    expect(itemB).not.toHaveClass(itemStyles.active);

    fireEvent.mouseEnter(itemB);
    expect(itemB).toHaveClass(itemStyles.active);
    expect(itemA).not.toHaveClass(itemStyles.active);
  });
});
