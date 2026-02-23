import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let game = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    imagen: {
        type: String,
        required: [true, 'La imagen es necesaria']
    },
    disponible: {
        type: Boolean
    }
});

const Game = mongoose.model("Game", game);

export default Game;