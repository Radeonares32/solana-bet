import { neo4j } from '../db/neo4j'

export const User = neo4j()?.model("user", {
    id: {
        primary: true,
        type: "uuid"
    },
    name: {
        type: "string"
    },
    surname: {
        type: "string"
    },
    coin: {
        type: "number"
    },
    email: {
        type: "string"
    },

    password: {
        type: "string"
    },

})