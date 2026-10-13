import { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight, MdFormatQuote } from "react-icons/md";

export default function TestimoniosCarousel({ testimonials }) {
  const [current, setCurrent] = useState(0);
  const [testimoniosPorVista, setTestimoniosPorVista] = useState(1);

  useEffect(() => {
    function handleResize() {
      setTestimoniosPorVista(window.innerWidth >= 1024 ? 2 : 1);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = testimonials.length;
  const next = () => setCurrent((prev) => (prev + testimoniosPorVista) % total);
  const prev = () => setCurrent((prev) => (prev - testimoniosPorVista + total) % total);

  // Selecciona los testimonios a mostrar
  let visibles = [];
  for (let i = 0; i < testimoniosPorVista; i++) {
    visibles.push(testimonials[(current + i) % total]);
  }

  return (
    <div>
      <div className="flex justify-center gap-6 transition-all duration-500">
        {visibles.map((testimonial, idx) => (
          <article
            key={idx}
            className="landing-card text-left w-full min-h-[380px] flex flex-col"
          >
            <MdFormatQuote className="landing-icon mb-3" />
            <p className="landing-copy mb-6 flex-1">
              “{testimonial.quote}”
            </p>
            <div className="pt-3 border-t border-gray-700">
              <h4 className="landing-card-title">{testimonial.name}</h4>
              <p className="text-gray-400 text-sm mt-1">{testimonial.country}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="landing-actions mt-6">
      <button
        onClick={prev}
        aria-label="Testimonio anterior"
        title="Testimonio anterior"
        className="landing-button landing-button-secondary landing-icon-button"
      >
        <MdChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={next}
        aria-label="Testimonio siguiente"
        title="Testimonio siguiente"
        className="landing-button landing-button-secondary landing-icon-button"
      >
        <MdChevronRight className="w-6 h-6" />
      </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: Math.ceil(total / testimoniosPorVista) }).map(
          (_, idx) => {
            const isActive = idx === Math.floor(current / testimoniosPorVista);

            return (
              <span
                key={idx}
                className={`h-2.5 rounded-full transition-all ${
                  isActive ? "w-6 bg-tc-yellow" : "w-2.5 bg-gray-500"
                }`}
              />
            );
          },
        )}
      </div>
    </div>
  );
}
