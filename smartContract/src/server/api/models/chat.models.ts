import { neo4j } from '../db/neo4j'

export const Chat = neo4j()?.model('Chat', {
    id: {
        primary: true,
        type: 'uuid',
    },
    name:{
        type:"string"
    }
});