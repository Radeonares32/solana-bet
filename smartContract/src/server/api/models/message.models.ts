import { neo4j } from '../db/neo4j'


export const Message = neo4j()?.model('Message', {
    id: {
        primary: true,
        type: 'uuid',
    },
    name: {
        type: "string"
    },
    message: {
        type: "string"
    }
});