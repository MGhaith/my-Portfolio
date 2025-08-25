import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ContactForm from "../components/ContactForm";
import * as api from "../api/api";

vi.spyOn(api, "submitContact").mockResolvedValue();

test("submits contact form", async () => {
  render(<ContactForm />);
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Ghaith" } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "a@b.com" } });
  fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Hello" } });
  fireEvent.click(screen.getByRole("button", { name: /send/i }));

  expect(await screen.findByText(/Message sent!/i)).toBeInTheDocument();
  expect(api.submitContact).toHaveBeenCalled();
});
