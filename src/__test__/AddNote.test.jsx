import { render, screen, fireEvent } from "@testing-library/react";
import AddNote from "../src/components/AddNote";
import "@testing-library/jest-dom";

describe("AddNote component", () => {
  const mockFetchNotes = jest.fn();
  const mockSetNoteToEdit = jest.fn();

  test("renderiza inputs y botones", () => {
    render(<AddNote fetchNotes={mockFetchNotes} setNoteToEdit={mockSetNoteToEdit} />);
    expect(screen.getByPlaceholderText(/Título/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contenido/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Categoría/i)).toBeInTheDocument();
    expect(screen.getByText(/Agregar/i)).toBeInTheDocument();
  });

  test("limpia los campos al hacer click en 'Limpiar'", () => {
    render(<AddNote fetchNotes={mockFetchNotes} setNoteToEdit={mockSetNoteToEdit} />);
    const titleInput = screen.getByPlaceholderText(/Título/i);
    fireEvent.change(titleInput, { target: { value: "Nota de prueba" } });
    expect(titleInput.value).toBe("Nota de prueba");

    fireEvent.click(screen.getByText(/Limpiar/i));
    expect(titleInput.value).toBe("");
  });
});
