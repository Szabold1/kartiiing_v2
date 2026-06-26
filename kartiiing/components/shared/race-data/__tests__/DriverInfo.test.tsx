import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { buildCountry } from "@/test/fixtures";
import DriverInfo from "../DriverInfo";

const country = buildCountry({ name: "Italy", code: "IT" });
const DRIVER_NAME = "John Doe";

describe("DriverInfo", () => {
  it("renders driver name", () => {
    render(<DriverInfo name="Max Verstappen" />);

    expect(screen.getByText("Max Verstappen")).toBeInTheDocument();
  });

  it("renders flag image when country and showFlag are provided", () => {
    const countryHu = buildCountry();
    render(<DriverInfo name={DRIVER_NAME} country={countryHu} />);

    expect(
      screen.getByRole("img", { name: `${countryHu.name} flag` }),
    ).toBeInTheDocument();
  });

  it("does not render flag when showFlag is false", () => {
    render(
      <DriverInfo name={DRIVER_NAME} country={country} showFlag={false} />,
    );

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("does not render flag when country is undefined", () => {
    render(<DriverInfo name={DRIVER_NAME} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("applies additional className", () => {
    const { container } = render(
      <DriverInfo name={DRIVER_NAME} className="tracking-wide" />,
    );

    expect(container.firstChild).toHaveClass("tracking-wide");
  });
});
