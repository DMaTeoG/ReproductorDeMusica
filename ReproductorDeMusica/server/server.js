require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;
const GENIUS_API_KEY = "TU_API_KEY_AQUI"; // Reemplaza con tu API Key de Genius

app.use(cors());

app.get("/searchLyrics", async (req, res) => {
    const { song, artist } = req.query;
    if (!song || !artist) {
        return res.status(400).json({ error: "Faltan parámetros: canción y artista." });
    }

    try {
        const response = await axios.get("https://api.genius.com/search", {
            headers: { Authorization: `Bearer ${GENIUS_API_KEY}` },
            params: { q: `${song} ${artist}` },
        });

        const hits = response.data.response.hits;

        if (!hits.length) {
            return res.status(404).json({ error: "Letra no encontrada." });
        }

        res.json(hits[0].result);
    } catch (error) {
        console.error("Error al buscar la letra en Genius:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
