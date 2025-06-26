const express = require('express');
const router = express.Router();


//banco 
const db = require('../database/db.js');

/**
 * @swagger
 * /noticias:
 *   get:
 *     summary: Lista todas as notícias
 *     tags:
 *       - Notícias
 *     responses:
 *       200:
 *         description: Lista de notícias retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   subtitulo:
 *                     type: string
 *                   conteudo:
 *                     type: string
 *                   imagemUrl:
 *                     type: string
 */
router.get('/noticias', (req, res) => {
    db.all('SELECT * FROM noticias', (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(rows);
    });
});


// GET - Buscar uma notícia por ID
/**
 * @swagger
 * /noticias/{id}:
 *   get:
 *     summary: Retorna uma notícia específica por ID
 *     tags:
 *       - Notícias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notícia encontrada
 *       404:
 *         description: Notícia não encontrada
 */
router.get('/noticias/:id', (req, res) => {
    const { id } = req.params; // pega o ID da URL

    // Consulta todas as notícias no banco
    db.get('SELECT * FROM noticias WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!row) return res.status(404).json({ erro: 'Noticia não encontrada' }) // mensagem de erro se retornar status 404!
        res.json(row); // retorna lista de notícias
    })
})



// POST - Cadastrar uma nova noticia
/**
 * @swagger
 * /noticias:
 *   post:
 *     summary: Cria uma nova notícia
 *     tags:
 *       - Notícias
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - subtitulo
 *               - conteudo
 *             properties:
 *               titulo:
 *                 type: string
 *               subtitulo:
 *                 type: string
 *               conteudo:
 *                 type: string
 *               imagemUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notícia criada com sucesso
 *       400:
 *         description: Dados obrigatórios não fornecidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/noticias', (req, res) => {
    const { titulo, subtitulo, conteudo, imagemUrl } = req.body;

    if (!titulo || !subtitulo || !conteudo) {
        return res.status(400).json({ erro: 'Título, subtítulo e conteúdo são obrigatórios' });
    }

    db.run(
        'INSERT INTO noticias (titulo, subtitulo, conteudo, imagemUrl) VALUES (?, ?, ?, ?)',
        [titulo, subtitulo, conteudo, imagemUrl],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });
            res.status(201).json({
                id: this.lastID,
                titulo,
                subtitulo,
                conteudo,
                imagemUrl,
            });
        }
    );
});


// PUT - Atualizar notícia por ID

/**
 * @swagger
 * /noticias/{id}:
 *   put:
 *     summary: Atualiza uma notícia existente
 *     tags:
 *       - Notícias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               subtitulo:
 *                 type: string
 *               conteudo:
 *                 type: string
 *               imagemUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notícia atualizada com sucesso
 *       404:
 *         description: Notícia não encontrada
 */
router.put('/noticias/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, subtitulo, conteudo, imagemUrl } = req.body;

    // Validação: campos obrigatórios para atualização
    if (!titulo || !subtitulo || !conteudo) {
        return res.status(400).json({
            erro: 'Título, subtítulo e conteúdo são obrigatórios para atualização'
        });
    }

    // Verifica se a notícia existe
    db.get('SELECT * FROM noticias WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ erro: err.message });

        if (!row) {
            return res.status(404).json({ erro: 'Notícia não encontrada' });
        }

        // Atualiza os campos
        db.run(
            'UPDATE noticias SET titulo = ?, subtitulo = ?, conteudo = ?, imagemUrl = ? WHERE id = ?',
            [titulo, subtitulo, conteudo, imagemUrl, id],
            function (err) {
                if (err) return res.status(500).json({ erro: err.message });

                res.json({ mensagem: 'Notícia atualizada com sucesso' });
            }
        );
    });
});



// DELETE - Excluir notícia por ID
/**
 *  
 * @swagger
 * /noticias/{id}:
 *   delete:
 *     summary: Remove uma notícia por ID
 *     tags:
 *       - Notícias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notícia removida com sucesso
 *       404:
 *         description: Notícia não encontrada
 */
router.delete('/noticias/:id', (req, res) => {
    const { id } = req.params;

    //Exclui a noticia no BD
    db.run('DELETE FROM noticias WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ erro: err.message });
        if (this.changes === 0) return res.status(404).json({ erro: 'Noticia não encontrada!!' });

        res.json({ mensagem: 'Noticia removida com sucesso!!' })
    });


});
module.exports = router;

