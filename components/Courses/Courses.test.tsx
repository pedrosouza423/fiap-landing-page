import { render, screen, fireEvent } from "@testing-library/react";
import { Courses } from "./Courses";

describe("Courses component", () => {
  it("renders main title and subtitle", () => {
    render(<Courses />);

    expect(screen.getByText("Cursos")).toBeInTheDocument();
    expect(screen.getByText("Cursos de Curta Duração")).toBeInTheDocument();
  });

  it("starts with Tecnologia category active", () => {
    render(<Courses />);

    const tecnologiaTab = screen.getByRole("button", { name: /tecnologia/i });
    expect(tecnologiaTab).toHaveClass("active");

    const categoria = screen.getByRole("heading", { level: 3, name: "Tecnologia" });
    expect(categoria).toBeInTheDocument();

    expect(screen.getByText("Big Data Ecosystem")).toBeInTheDocument();
  });

  it("changes category when clicking Inovação tab", () => {
    render(<Courses />);

    const inovacaoTab = screen.getByRole("button", { name: /inovação/i });
    fireEvent.click(inovacaoTab);

    expect(screen.getByRole("heading", { level: 3, name: "Inovação" })).toBeInTheDocument();
    expect(screen.getByText("UX")).toBeInTheDocument();
    expect(screen.getByText("UX Writing")).toBeInTheDocument();
  });

  it("changes category when clicking Negócios tab", () => {
    render(<Courses />);

    const negociosTab = screen.getByRole("button", { name: /negócios/i });
    fireEvent.click(negociosTab);

    expect(screen.getByRole("heading", { level: 3, name: "Negócios" })).toBeInTheDocument();
    expect(screen.getByText("Agile Culture")).toBeInTheDocument();
    expect(screen.getByText("Growth Hacking")).toBeInTheDocument();
  });

  it("marks active tab visually", () => {
    render(<Courses />);

    const tecnologiaTab = screen.getByRole("button", { name: /tecnologia/i });
    expect(tecnologiaTab).toHaveClass("active");
  });
});
