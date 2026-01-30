import { render, screen, fireEvent } from "@testing-library/react";
import { FAQ } from "./FAQ";

describe("FAQ component", () => {
  it("renders title and subtitle", () => {
    render(<FAQ />);
    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("Dúvidas Frequentes")).toBeInTheDocument();
  });

  it("does not show answers by default", () => {
    render(<FAQ />);

    expect(
      screen.queryByText(/Você pode se matricular em qualquer dia e hora/i)
    ).not.toBeInTheDocument();
  });

  it("shows answer on hover and hides on mouse leave", () => {
    render(<FAQ />);

    const item = screen.getByTestId("faq-item-multi-cursos");

    fireEvent.mouseEnter(item);
    expect(screen.getByText(/Apenas atente-se às datas/i)).toBeInTheDocument();

    fireEvent.mouseLeave(item);
    expect(screen.queryByText(/Apenas atente-se às datas/i)).not.toBeInTheDocument();
  });
});
