const { Schema, model } = require("mongoose");

const recursosSchema = new Schema({

    nombre: {
        type: "String",
    },
    descripcion: {
        type: "String",
    },
    etiquetas: {
        type: ["String"],
    },
    links: {
        type: ["Mixed"],
    },
    imagen: {
        type: "String",
    },
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = model("Recursos", recursosSchema, "recursos");