import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "react-hot-toast";
import { Crown, Mail, MapPin, MessageCircle } from "lucide-react";
import SectionHeader from "../Header/Header";

const SERIF = { fontFamily: "'Spectral', Georgia, serif" };
const MONO = { fontFamily: "'Space Mono', 'Courier New', monospace" };

export default function ContactOld() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });
  const handleSubmit = (event) => {
    event.preventDefault();
    emailjs
      .send(
        "service_b9zavnp",
        "template_j3j3tuf",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "5l9gmwAXAJjYYVtn-",
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        () => toast.error("Failed to send message."),
      );
  };

  return (
    <>
      <Toaster position="top-center" />
      <section className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 py-10 text-[#2A2018] md:px-10 md:py-12">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 30%, #d4af3720 0, transparent 35%), radial-gradient(circle at 85% 70%, #7a2e2e25 0, transparent 40%)",
          }}
        />
        <div className="relative z-10 grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="text-center lg:text-left">
            <SectionHeader
              title="Get In Touch"
              subtitle="Let's connect directly!"
            />
            <p
              style={MONO}
              className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#B08D57]"
            >
              Final Archive · Open Correspondence
            </p>
            <h2
              style={SERIF}
              className="text-4xl font-semibold text-[#F5EEDF] md:text-5xl"
            >
              Let&apos;s make something{" "}
              <span className="italic text-[#D4AF37]">remarkable.</span>
            </h2>
            <p
              style={SERIF}
              className="mt-6 text-lg leading-relaxed text-[#E8DFC8]"
            >
              For collaborations, thoughtful interfaces, or a good conversation
              about the craft, send a note.
            </p>
            <div style={MONO} className="mt-8 space-y-3 text-xs text-[#B08D57]">
              <p className="flex items-center justify-center gap-2 lg:justify-start">
                <MapPin size={15} /> Alexandria, Egypt
              </p>
              <a
                href="mailto:fffady354@gmail.com"
                className="flex items-center justify-center gap-2 hover:text-[#D4AF37] lg:justify-start"
              >
                <Mail size={15} /> fffady354@gmail.com
              </a>
              <a
                href="https://wa.me/201011620644"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 hover:text-[#D4AF37] lg:justify-start"
              >
                <MessageCircle size={15} /> Ask for offers
              </a>
            </div>
          </div>
          <div
            className="relative bg-[#F5EEDF] p-7 shadow-[10px_12px_0px_rgba(42,32,24,0.35)] md:p-10"
            style={{
              clipPath:
                "polygon(0% 2%, 98% 0%, 100% 4%, 98% 98%, 74% 100%, 48% 98%, 22% 100%, 1% 97%)",
            }}
          >
            <div className="absolute inset-0 border-4 border-[#B08D57]/30 pointer-events-none" />
            <div className="mb-7 flex items-center justify-between">
              <span
                style={MONO}
                className="text-[10px] uppercase tracking-[0.2em] text-[#8C7851]"
              >
                Letter No. 006
              </span>
              <Crown size={22} className="text-[#7A2E2E]" />
            </div>
            <form
              onSubmit={handleSubmit}
              className="relative z-10 flex flex-col gap-5"
            >
              {[
                ["name", "Your name"],
                ["email", "Your email"],
              ].map(([name, placeholder]) => (
                <input
                  key={name}
                  required
                  name={name}
                  type={name === "email" ? "email" : "text"}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  className="border-b border-[#8C7851]/50 bg-transparent p-3 text-[#2A2018] outline-none placeholder:text-[#8C7851] focus:border-[#7A2E2E]"
                />
              ))}
              <textarea
                required
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                className="min-h-[130px] border border-[#8C7851]/50 bg-transparent p-3 text-[#2A2018] outline-none placeholder:text-[#8C7851] focus:border-[#7A2E2E]"
              />
              <button
                type="submit"
                style={MONO}
                className="self-start bg-[#7A2E2E] px-6 py-3 text-xs uppercase tracking-wider text-[#F5EEDF] shadow-[4px_4px_0px_rgba(42,32,24,0.3)] hover:bg-[#8C3A3A]"
              >
                Seal and send
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
