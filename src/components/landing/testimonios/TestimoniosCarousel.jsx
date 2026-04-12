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
    <div className="relative px-2 md:px-8">
      <div className="flex justify-center gap-6 transition-all duration-500">
        {visibles.map((testimonial, idx) => (
          <article
            key={idx}
            className="bg-tc-black-l border border-gray-700 rounded-lg p-6 text-center w-full max-w-xl min-h-[380px] hover:shadow-xl hover:border-gray-500 transition-all duration-200 mx-auto flex flex-col"
          >
            <MdFormatQuote className="w-10 h-10 text-tc-yellow mb-3 mx-auto" />
            <p className="text-gray-200 text-lg leading-relaxed italic mb-6 flex-1">
              “{testimonial.quote}”
            </p>
            <div className="pt-3 border-t border-gray-700">
              <h4 className="text-white font-bold text-2xl">{testimonial.name}</h4>
              <p className="text-gray-400 text-sm mt-1">{testimonial.country}</p>
            </div>
          </article>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-0 md:-left-2 top-1/2 -translate-y-1/2 bg-tc-black-l border border-gray-600 text-tc-yellow rounded-full p-2.5 shadow hover:bg-tc-yellow hover:text-tc-black transition-colors"
      >
        <MdChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={next}
        className="absolute right-0 md:-right-2 top-1/2 -translate-y-1/2 bg-tc-black-l border border-gray-600 text-tc-yellow rounded-full p-2.5 shadow hover:bg-tc-yellow hover:text-tc-black transition-colors"
      >
        <MdChevronRight className="w-6 h-6" />
      </button>

      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: Math.ceil(total / testimoniosPorVista) }).map(
          (_, idx) => {
            const isActive =
              idx === Math.floor(current / testimoniosPorVista) ||
              (idx === 0 && current >= total - (total % testimoniosPorVista || testimoniosPorVista));

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