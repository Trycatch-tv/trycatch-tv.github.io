import { useEffect, useState } from "react";
import MdChevronLeft from "react-icons/md/MdChevronLeft";
import MdChevronRight from "react-icons/md/MdChevronRight";
import MdFormatQuote from "react-icons/md/MdFormatQuote";

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
    <div className="relative">
      <div className="flex justify-center gap-6 transition-all duration-500">
        {visibles.map((testimonial, idx) => (
          <div key={idx} className="bg-tc-black-l border border-gray-700 rounded-md p-6 text-center w-full max-w-md hover:shadow-xl transition-transform transform hover:scale-105 mx-auto">
            <MdFormatQuote className="w-8 h-8 text-tc-yellow mb-3 mx-auto" />
            <p className="text-gray-300 text-sm italic mb-4">“{testimonial.quote}”</p>
            <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
            <p className="text-gray-400 text-xs">{testimonial.country}</p>
          </div>
        ))}
      </div>
      <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-tc-black text-tc-yellow rounded-full p-2 shadow hover:bg-tc-yellow hover:text-tc-black transition-colors"><MdChevronLeft className="w-6 h-6" /></button>
      <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 bg-tc-black text-tc-yellow rounded-full p-2 shadow hover:bg-tc-yellow hover:text-tc-black transition-colors"><MdChevronRight className="w-6 h-6" /></button>
    </div>
  );
} 