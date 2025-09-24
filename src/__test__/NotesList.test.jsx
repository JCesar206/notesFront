import { render, screen, fireEvent } from "@testing-library/react";
import NotesList from "../src/components/NotesList";
import "@testing-library/jest-dom";

describe("NotesList component", () => {
  const mockNotes = [
    { id: 1, title: "Nota A", content: "Contenido A", category: "Trabajo", favorite: false, completed: false },
    { id: 2, title: "Nota B", content: "Contenido B", category: "Personal", favorite: true, completed: true },
  ];
  const mockFetchNotes = jest.fn();
  const mockSetNoteToEdit = jest.fn();

  test("renderiza lista de notas", () => {
    render(
      <NotesList
        notes={mockNotes}
        fetchNotes={mockFetchNotes}
        filters={{ keyword: "", favorite: false, completed: false }}
        setNoteToEdit={mockSetNoteToEdit}
      />
    );
    expect(screen.getByText("Nota A")).toBeInTheDocument();
    expect(screen.getByText("Nota B")).toBeInTheDocument();
  });

  test("permite hacer click en editar", () => {
    render(
      <NotesList
        notes={mockNotes}
        fetchNotes={mockFetchNotes}
        filters={{ keyword: "", favorite: false, completed: false }}
        setNoteToEdit={mockSetNoteToEdit}
      />
    );
    fireEvent.click(screen.getAllByText(/Editar|Edit/)[0]); 
    expect(mockSetNoteToEdit).toHaveBeenCalledWith(mockNotes[0]);
  });
});
