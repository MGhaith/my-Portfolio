import { useState } from "react";
import { submitContact } from "../api/api";
import type { ContactFormData as ContactFormType } from "../api/types";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormType>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
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
    <section className="py-10" id="contact">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Me</h2>
        
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Get in Touch
            </CardTitle>
            <CardDescription>
              Have a question or want to work together? Send me a message!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  value={form.message}
                  onChange={handleChange}
                  className={errors.message ? "border-red-500" : ""}
                  rows={4}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">{errors.message}</p>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <p className={`text-sm ${status === "Message sent!" ? "text-green-500" : status === "Failed to send message." ? "text-red-500" : ""}`}>
              {status}
            </p>
            <Button type="submit" onClick={handleSubmit}>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
