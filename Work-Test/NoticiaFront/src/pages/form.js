import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style/form.css';

function Form() {
    const navigate = useNavigate();


    const [form, setForm] = useState({
        titulo: '',
        subtitulo: '',
        conteudo: '',
        imagemUrl: ''
    });

    // Att os valores
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    //envia os dados
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/noticias', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao tentar cadastrar notícia!');
                return res.json();
            })
            .then(() => {
                navigate('/'); // Redireciona para home
            })
            .catch((err) => {
                alert('Erro ao salvar a notícia : ' + err.message);
            });
    };

    return (
        <div>
            {/* Botão para nova notícia */}
                  <div className="btn-noticia-container">
                    <Link to="/" className="btn-noticia">
                      Notícias
                    </Link>
                  </div>

            <h1>Publicar Noticia</h1>

            <form onSubmit={handleSubmit}>
                <input
                    name="titulo"
                    placeholder="Título"
                    value={form.titulo}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    name="subtitulo"
                    placeholder="Subtítulo"
                    value={form.subtitulo}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"

                />
                <textarea
                    name="conteudo"
                    placeholder="Conteúdo"
                    value={form.conteudo}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full p-2 border rounded"
                ></textarea>

                <input
                    name="imagemUrl"
                    placeholder="URL da imagem"
                    value={form.imagemUrl}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />

                <button type="submit" className="btn-noticia">
                    Postar Notícia
                </button>

            </form>
        </div>
    )
}

export default Form;