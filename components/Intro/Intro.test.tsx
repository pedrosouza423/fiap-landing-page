import { render, screen } from "@testing-library/react";
import { Intro } from "./Intro";

// Aqui a gente isola o Intro: não testa o Marquee neste arquivo
jest.mock("./components/Marquee/Marquee", () => ({
  Marquee: ({ variant, borderMode }: { variant: string; borderMode: string }) => (
    <div data-testid={`marquee-${variant}`} data-border={borderMode} />
  ),
}));

describe("Intro", () => {
  it("renders two marquees with correct variants and border modes", () => {
    render(<Intro />);

    const marqueeDefault = screen.getByTestId("marquee-default");
    expect(marqueeDefault).toBeInTheDocument();
    expect(marqueeDefault).toHaveAttribute("data-border", "bottom");

    const marqueeScroll = screen.getByTestId("marquee-scroll");
    expect(marqueeScroll).toBeInTheDocument();
    expect(marqueeScroll).toHaveAttribute("data-border", "none");
  });

  it("renders the intro image with correct alt text", () => {
    render(<Intro />);

    const img = screen.getByAltText(/pessoa estudando com notebook/i);
    expect(img).toBeInTheDocument();
  });
});
