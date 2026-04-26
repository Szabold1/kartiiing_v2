import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { useState } from "react";
import SearchBar from "../SearchBar";

const placeholder = "Search...";
const searchTerm = "kz2";

/**
 * Helper function to render the SearchBar with default or custom props and return commonly used elements and utilities.
 */
function setup(searchQuery = "", setSearchQuery = vi.fn()) {
  const user = userEvent.setup();
  render(
    <SearchBar
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      placeholder={placeholder}
    />,
  );

  const input = screen.getByPlaceholderText(placeholder);
  const clearBtn = () => screen.queryByRole("button", { name: "Clear search" });

  return { user, input, clearBtn, setSearchQuery };
}

/**
 * Tests for the SearchBar component
 */
describe("SearchBar", () => {
  it("renders the search input with placeholder", () => {
    const { input } = setup();

    expect(input).toBeInTheDocument();
  });

  it("displays the current searchQuery value", () => {
    setup(searchTerm);

    expect(screen.getByDisplayValue(searchTerm)).toBeInTheDocument();
  });

  it("calls setSearchQuery with the typed value when user types", async () => {
    const onChangeSpy = vi.fn();
    const user = userEvent.setup();

    function ControlledSearchBar() {
      const [query, setQuery] = useState("");

      const handleSearchQueryChange = (value: string) => {
        onChangeSpy(value);
        setQuery(value);
      };

      return (
        <SearchBar
          searchQuery={query}
          setSearchQuery={handleSearchQueryChange}
          placeholder={placeholder}
        />
      );
    }

    render(<ControlledSearchBar />);
    const input = screen.getByPlaceholderText(placeholder);

    await user.type(input, searchTerm);

    expect(onChangeSpy).toHaveBeenNthCalledWith(1, "k");
    expect(onChangeSpy).toHaveBeenNthCalledWith(2, "kz");
    expect(onChangeSpy).toHaveBeenNthCalledWith(3, "kz2");
    expect(input).toHaveValue(searchTerm);
  });

  it("does not show the clear button when searchQuery is empty", () => {
    const { clearBtn } = setup();

    expect(clearBtn()).not.toBeInTheDocument();
  });

  it("shows the clear button when searchQuery has a value", () => {
    const { clearBtn } = setup(searchTerm);

    expect(clearBtn()).toBeInTheDocument();
  });

  it("calls setSearchQuery with empty string when clear button is clicked", async () => {
    const setSearchQuery = vi.fn();
    const { user, clearBtn } = setup(searchTerm, setSearchQuery);

    await user.click(clearBtn()!);

    expect(setSearchQuery).toHaveBeenCalledWith("");
  });

  it("focuses the input after clicking the clear button", async () => {
    const { user, input, clearBtn } = setup(searchTerm);

    await user.click(clearBtn()!);

    expect(input).toHaveFocus();
  });

  it("clears the search when Escape is pressed and query is not empty", async () => {
    const setSearchQuery = vi.fn();
    const { user, input } = setup(searchTerm, setSearchQuery);

    await user.click(input);
    await user.keyboard("{Escape}");

    expect(setSearchQuery).toHaveBeenCalledWith("");
  });

  it("blurs the input when Escape is pressed and query is already empty", async () => {
    const { user, input } = setup();

    await user.click(input);
    await user.keyboard("{Escape}");

    expect(input).not.toHaveFocus();
  });
});
