import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import '../style/home.css';

function Home() {
    const [noticias, setNoticias] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [formEdit, setFormEdit] = useState({
        titulo: '',
        subtitulo: '',
        conteudo: '',
        imagemUrl: ''
    });

    const carregarNoticias = () => {
        fetch('/noticias')
            .then(res => res.json())
            .then(setNoticias);
    };

    useEffect(() => {
        carregarNoticias();
    }, []);

    const excluirNoticia = (id) => {
        if (!window.confirm('Deseja excluir esta notícia?')) return;

        fetch(`/noticias/${id}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error('Erro ao excluir');
                carregarNoticias();
                if (editandoId === id) setEditandoId(null);
            })
            .catch(err => alert(err.message));
    };

    const iniciarEdicao = (noticia) => {
        setEditandoId(noticia.id);
        setFormEdit({ ...noticia });
    };

    const cancelarEdicao = () => {
        setEditandoId(null);
        setFormEdit({ titulo: '', subtitulo: '', conteudo: '', imagemUrl: '' });
    };

    const handleChange = (e) => {
        setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
    };

    const salvarEdicao = (id) => {
        fetch(`/noticias/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formEdit)
        })
            .then(res => {
                if (!res.ok) throw new Error('Erro ao salvar');
                carregarNoticias();
                setEditandoId(null);
            })
            .catch(err => alert(err.message));
    };

    return (
        <div className="container">
            <h1>Últimas Notícias</h1>
           
            {/* Botão para nova notícia */}
            <div className="btn-nova-noticia-container">
                <Link to="/post" className="btn-nova-noticia">
                    + Publicar Notícia
                </Link>
            </div>
            {noticias.map(n => (
                <div key={n.id} className="card">
                    {editandoId === n.id ? (
                        <>
                            <a href={`/noticias/${n.id}`} className="link-detalhes" target="_blank" rel="noopener noreferrer">
                                Ver detalhes
                            </a>

                            <input name="titulo" value={formEdit.titulo} onChange={handleChange} placeholder="Título" />
                            <input name="subtitulo" value={formEdit.subtitulo} onChange={handleChange} placeholder="Subtítulo" />
                            <textarea name="conteudo" value={formEdit.conteudo} onChange={handleChange} placeholder="Conteúdo" />
                            <input name="imagemUrl" value={formEdit.imagemUrl} onChange={handleChange} placeholder="URL da imagem" />

                            <div className="actions">
                                <button className="btn btn-save" onClick={() => salvarEdicao(n.id)}>Salvar</button>
                                <button className="btn btn-cancel" onClick={cancelarEdicao}>Cancelar</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <a href={`/noticias/${n.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h2>{n.titulo}</h2>
                                <h4>{n.subtitulo}</h4>
                                {n.imagemUrl && <img src={n.imagemUrl} alt="Imagem da notícia" />}
                            </a>

                            <div className="actions">
                                <button className="btn btn-edit" onClick={() => iniciarEdicao(n)}>Editar</button>
                                <button className="btn btn-delete" onClick={() => excluirNoticia(n.id)}>Excluir</button>
                            </div>
                            <div className="btn-nova-noticia-container">
                                <Link to={`/noticias/${n.id}`} className="btn-nova-noticia">
                                    + Ver mais
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Home;
