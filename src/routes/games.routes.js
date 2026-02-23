import {
    Router
} from "express";
import {
    validationResult
} from "express-validator";
import {
    welcome,
    getAllGames,
    insertGame,
    deleteGame,
    getOneGame,
    updateGame
} from '../controllers/games.ctrler.js';
import {
    validateRules,
    validate
} from './mdValidate.js';

const router = Router();

// EP WELCOME
router.get('/', welcome);
// EP GET ALL GAMES
router.get('/games', getAllGames);
// EP INSERT GAME
router.post('/games', [validateRules(), validate], insertGame);
// EP DELETE GAME
router.put('/games', deleteGame);
// EP GET ONE GAME
router.get('/games/:id', getOneGame);
// EP TO UPDATE
router.post('/gamesUpdate', updateGame);

export default router;