const { Router } = require("express");
const router = Router();

const Recursos = require("../models/Recursos");

const jwt = require("jsonwebtoken");

// router.get("/recursos", (req, res) => {
//     res.send("hello 2");
// });

router.post("/recursos", async(req, res) => {
    const { nombre } = req.body;
    const name = await Recursos.findOne({ nombre });
    if (name) {
        res.status(401).send("El Recurso existe");
    } else {
        const { descripcion } = req.body;
        const overview = await Recursos.findOne({ descripcion });
        if (overview) {
            res.status(401).send("Cambie la Descripcion");
        } else {
            recursos = new Recursos({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                etiquetas: req.body.etiquetas,
                links: req.body.links,
                imagen: req.body.imagen,
            });

            recursos
                .save()
                .then((recursos) => {
                    res.send(recursos);
                })
                .catch((error) => {
                    res.status(500).send("recursos was not stored in db");
                });
        }
    }

    // const { email, password } = req.body;
    // const newUser = new User({ email, password });
    // await newUser.save();
    // const token = await jwt.sign({ _id: newUser._id }, "secretkey");
    // res.status(200).json({ token });
});



router.get("/recursos", (req, res) => {
    Recursos.find()
        .then((recursos) => res.send(recursos))
        .catch((error) => {
            res.status(500).send("Something went wrong");
        });
});


//GET THE RECURSO BY ID
router.get("/recursos/:recursoId", async(req, res) => {
    const recurso = await Recursos.findById(req.params.recursoId);
    if (!recurso) res.status(404).send("Recurso not found");
    res.send(recurso);
});

//UPDATE BOOK BASED ON ID
router.put("/recursos/:recursoId", async(req, res) => {
    const updatedRecurso = await Recursos.findByIdAndUpdate(
        req.params.recursoId, {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            etiquetas: req.body.etiquetas,
            links: req.body.links,
            imagen: req.body.imagen,
        }, { new: true }
    );

    if (!updatedRecurso) res.status(404).send("Recurso nont found");
    res.send(updatedRecurso);
});

//DELETE BOOK BASED ON ID
router.delete("/recursos/:recursoId", async(req, res) => {
    const recurso = await Recursos.findByIdAndRemove(req.params.recursoId);
    if (!recurso) res.status(404).send("Recurso with id not found");
    res.send(recurso);
});

async function verifyToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send("Unauhtorized Request");
        }
        let token = req.headers.authorization.split(" ")[1];
        if (token === "null") {
            return res.status(401).send("Unauhtorized Request");
        }

        const payload = await jwt.verify(token, "secretkey");
        if (!payload) {
            return res.status(401).send("Unauhtorized Request");
        }
        req.userId = payload._id;
        next();
    } catch (e) {
        //console.log(e)
        return res.status(401).send("Unauhtorized Request");
    }
}
async function verifyTokenAdmin(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send("Unauhtorized Request");
        }
        let token = req.headers.authorization.split(" ")[1];
        if (token === "null") {
            return res.status(401).send("Unauhtorized Request");
        }

        const payload = await jwt.verify(token, "marcador");
        if (!payload) {
            return res.status(401).send("Unauhtorized Request");
        }
        req.userId = payload._id;
        next();
    } catch (e) {
        //console.log(e)
        return res.status(401).send("Unauhtorized Request");
    }
}

module.exports = router;