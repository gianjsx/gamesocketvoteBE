import Game from '../models/gamesModel.js';
import {
    uploadImage
} from './utils/ctrlerUtils.js';


// ENDPOINT WELCOME
export const welcome = (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'REST API GAMES WITH SOCKET IO',
        dateTime: "04.10.21"
    })
}

// ENDPOINT TO GET ALL GAMES
export const getAllGames = async (req, res) => {
    try {
        let gameDB = await Game.find({
            disponible: true
        });
        if (!gameDB) {
            return res.json(500).json({
                ok: false,
                message: 'Error Server'
            });
        }
        return res.status(200).json({
            ok: true,
            message: 'success',
            gameDB
        });
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            ok: false,
            message: 'Error server catch',
        });
    }
}

// ENDPOINT INSERT GAME
export const insertGame = async (req, res) => {

    if (!req.file) {
        let message = ['La imagen no puede estar vacia'];
        let params = ["file"];
        return res.status(422).json({
            ok: false,
            validate: true,
            message,
            params
        });
    }

    try {
        let imageUp = await uploadImage(req.file.path);
        if (!imageUp.ok) {
            return res.status(404).json({
                ok: false,
                message: 'Error trying to upload image'
            });
        }
        const game = new Game();
        game.nombre = req.body.nombre;
        game.imagen = imageUp.imageUpload.url;
        game.disponible = true;
        let gameDB = game.save();
        if (!gameDB) {
            return res.status(500).json({
                ok: false,
                message: 'Error trying to save to DB server'
            });
        }
        return res.status(200).json({
            ok: true,
            message: 'Saved Success'
        });
    } catch (e) {
        console.log('Error ED INSERT GAME: ', e);
        return res.status(500).json({
            ok: false,
            message: 'Error insert or upload game'
        });
    }

}

// ENDPOINT DELETE GAME
export const deleteGame = async (req, res) => {
    let id = req.body.id;
    let game = new Game();
    let gameDb = await Game.findByIdAndUpdate(id, {
        disponible: false
    });
    console.log(gameDb);
    res.status(200).json({
        ok: true,
        message: 'ok man'
    })
}

// ENDPOINT TO GET A GAME
export const getOneGame = async (req, res) => {
    let id = req.params.id;
    try {
        let gamesDB = await Game.findById(id);
        if (!gamesDB) {
            return res.status(500).json({
                ok: false,
                message: 'Error Server'
            })
        }
        return res.status(200).json({
            ok: true,
            message: 'Success',
            gamesDB
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            ok: false,
            message: 'Error trying to get a games'
        })
    }
}

// TO UPDATE A GAME
export const updateGame = async (req, res) => {
    // console.log('hello');
    let {
        id,
        nombre
    } = req.body;
    let imagenUpdate;


    try {
        // FIND A GAME
        let gameDB = await Game.findById(id);
        if (!gameDB) {
            console.log('not found')
            return res.status(500).json({
                ok: false,
                message: 'Error Server'
            });
        }
        console.log(gameDB);
        // return res.status(200).json({
        //     ok: true
        // })
        // IF GAMES EXIST AND SEND A FILE
        if (req.file) {
            let imageUp = await uploadImage(req.file.path);
            imagenUpdate = imageUp.imageUpload.url;
        } else {
            imagenUpdate = gameDB.imagen;
        }
        let gamesUpdatedDB = await Game.findByIdAndUpdate(gameDB._id, {
            nombre: nombre || gameDB.nombre,
            imagen: imagenUpdate
        });

        if (!gamesUpdatedDB) {
            return res.status(200).json({
                ok: false,
                message: 'Error updating'
            });
        }
        console.log(gamesUpdatedDB);
        res.status(200).json({
            ok: true,
            message: 'updated success',
            gamesUpdatedDB
        })
        // console.log(gameDB);
    } catch (e) {
        console.log('catch');
        return res.status(400).json({
            ok: false,
            message: 'El usuario no existe',
            e
        });
    }


    // let id = req.params.id;
    // console.log(req.params.id);
    // res.status(200).json({
    //     ok: true,
    //     message: 'Recived',
    //     id
    // });
}