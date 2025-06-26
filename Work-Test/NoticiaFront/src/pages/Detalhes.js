import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../style/detalhes.css'; // arquivo de estilos

function Detalhes() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    fetch(`/noticias/${id}`)
      .then(res => res.json())
      .then(setNoticia)
      .catch(console.error);
  }, [id]);

  if (!noticia) return <p>Carregando...</p>;

  return (
    <div className="detalhes-container">
      <Link to="/" className="voltar-link">← Voltar</Link>

      <h1 className="titulo">{noticia.titulo}</h1>
      <h3 className="subtitulo">{noticia.subtitulo}</h3>

      {noticia.imagemUrl && (
        <img
          className="imagem-detalhe"
          src={noticia.imagemUrl}
          alt={`Imagem da notícia: ${noticia.titulo}`}
        />
      )}

      <p className="conteudo">{noticia.conteudo}</p>
    </div>
  );
}

export default Detalhes;
