import { useState } from "react";
import { submitContact } from "../api/api";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      await submitContact(form);
      setStatus("Message sent!");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("Failed to send message.");
    }
  };

  return (
    <div>
      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
        <button type="submit">Send</button>
      </form>
      <p>{status}</p>
    </div>
  );
}
