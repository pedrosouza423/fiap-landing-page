import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header component", () => {
  it("renders main section with aria-label", () => {
    render(<Header />);

    const section = screen.getByLabelText("Header");
    expect(section).toBeInTheDocument();
  });

  it("renders background text (aria-hidden)", () => {
    render(<Header />);

    const bgText = screen.getByText("SOBRE");
    expect(bgText).toBeInTheDocument();
    expect(bgText).toHaveAttribute("aria-hidden", "true");
  });

  it("renders title lines", () => {
    render(<Header />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText("A melhor faculdade")).toBeInTheDocument();
    expect(screen.getByText("de tecnologia")).toBeInTheDocument();
  });
});
