const client = require('./client');
const util = require('util');

const REPLACE_ME = 'HELP REPLACE ME!!!!';

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
        const { rows: videoGames } = await client.query(REPLACE_ME);
        return videoGames;
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
    try {
        const { title, platform, release_date } = body;
        const { rows: [newVideoGame] } = await client.query(`
            INSERT INTO videoGames (title, platform, release_date)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [title, platform, release_date]);
        return newVideoGame;
    } catch (error) {
        throw error;
    }
}


// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
    try {
        const { title, platform, release_date } = fields;
        const { rows: [updatedVideoGame] } = await client.query(`
            UPDATE videoGames
            SET title = $1, platform = $2, release_date = $3
            WHERE id = $4
            RETURNING *;
        `, [title, platform, release_date, id]);
        return updatedVideoGame;
    } catch (error) {
        throw error;
    }
}


// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    try {
        await client.query(`
            DELETE FROM videoGames
            WHERE id = $1;
        `, [id]);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}