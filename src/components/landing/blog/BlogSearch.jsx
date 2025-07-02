import { useState } from "react";

export default function BlogSearch({ posts }) {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Filtrar posts según la búsqueda
  const filteredPosts = posts.filter((post) =>
    post.frontmatter.title.toLowerCase().includes(query.toLowerCase()) ||
    post.frontmatter.author.toLowerCase().includes(query.toLowerCase())
  );

  // Calcular paginación
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIdx = (currentPage - 1) * postsPerPage;
  const endIdx = startIdx + postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIdx, endIdx);

  // Reiniciar página al cambiar búsqueda
  function handleQueryChange(e) {
    setQuery(e.target.value);
    setCurrentPage(1);
  }

  return (
    <>
      <div className="mb-8 flex">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Buscar por título o autor..."
          className="flex-1 rounded-l-md p-2 border border-tc-black-l focus:outline-none focus:ring-2 focus:ring-tc-yellow"
        />
      </div>
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center text-gray-400">No se encontraron entradas.</div>
        ) : (
          paginatedPosts.map((post) => {
            const imageUrl = post.frontmatter.image?.url || "https://placehold.co/80x80?text=Blog";
            const imageAlt = post.frontmatter.image?.alt || post.frontmatter.title || "Imagen del post";
            return (
              <a
                key={post.url}
                href={post.url}
                className="block hover:bg-tc-black-l dark:hover:bg-tc-gray bg-tc-gray dark:bg-tc-black rounded-md p-4 transition"
              >
                <div className="flex items-center space-x-8 hover:text-white">
                  <img
                    className="w-20 h-20 rounded-full object-cover"
                    src={imageUrl}
                    alt={imageAlt}
                  />
                  <div className="flex flex-col text-tc-black dark:text-white">
                    <span className="text-xl font-medium">
                      {post.frontmatter.title}
                    </span>
                    <span className="text-sm">
                      {post.frontmatter.author} | {new Date(post.frontmatter.date).toLocaleDateString("es-CO", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </a>
            );
          })
        )}
      </div>
      {/* Controles de paginación */}
      {filteredPosts.length > postsPerPage && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-tc-black text-white dark:bg-tc-gray dark:text-tc-black disabled:opacity-50"
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-tc-yellow text-tc-black' : 'bg-tc-black text-white dark:bg-tc-gray dark:text-tc-black'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-tc-black text-white dark:bg-tc-gray dark:text-tc-black disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  );
} 