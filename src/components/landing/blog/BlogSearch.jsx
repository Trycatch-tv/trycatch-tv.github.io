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
          aria-label="Buscar por título o autor"
          className="flex-1 w-full"
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
                className="landing-card block"
              >
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <img
                    className="w-20 h-20 rounded object-cover shrink-0"
                    src={imageUrl}
                    alt={imageAlt}
                    onError={(event) => {
                      const image = event.currentTarget;
                      if (!image.src.endsWith("/favicon.svg")) {
                        image.src = "/favicon.svg";
                        image.alt = "TryCatch.tv";
                      }
                    }}
                  />
                  <div className="flex flex-col min-w-0 gap-2">
                    <span className="landing-card-title">
                      {post.frontmatter.title}
                    </span>
                    <span className="site-meta">
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
        <div className="site-pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="landing-button landing-button-secondary disabled:opacity-50"
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              aria-current={currentPage === i + 1 ? "page" : undefined}
              className={`landing-button landing-icon-button ${currentPage === i + 1 ? 'landing-button-primary' : 'landing-button-secondary'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="landing-button landing-button-secondary disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  );
}
