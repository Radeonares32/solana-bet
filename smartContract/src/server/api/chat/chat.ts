import { Chat } from "../models/chat.models";
import { Message } from "../models/message.models";

import { neo4j } from "../db/neo4j";

import { decrypt, encrypt } from "../security/crypto.sec";



export const createRoom = async (name: any, reName: any) => {
    const isRoom: any = await neo4j()?.cypher("match(c:Chat {name:$name}) return c.name", {
        name
    }).catch(err => console.log(err))
    const isReRoom: any = await neo4j()?.cypher("match(c:Chat {name:$reName}) return c.name", {
        reName
    })
    const isRoom1 = isRoom.records.map((room1: any) => {
        return room1.map((room: any) => {
            return room
        })
    })
    const isRoom2 = isReRoom.records.map((room2: any) => {
        return room2.map((room: any) => {
            return room
        })
    })
    if (isRoom1.length === 0 && isRoom2.length === 0) {
        await Chat?.create({
            name: name,
        }).catch(err => console.log(err))
        return {
            message: "successRoomCreated"
        }
    } else {
        return {
            message: "alreadyRoom"
        }
    }

}
export const findUser = async (id: any) => {
    return neo4j()?.cypher('match(p:user {id:$id}) return p.name', {
        id
    }).catch(err => console.log(err))
}
//Smart contract id
export const findRoom = async (userId: any, otherUserId: any) => {
    const chat: any = await neo4j()?.cypher(`match(p:user {id:$userId}) match(p1:user {id:$otherUserId}) match(c:Chat) match(p)-->(c)  match(p1)-->(c) return c`, {
        userId,
        otherUserId
    }).catch(err => console.log(err))
    const rChat = chat.records.map((chat1: any) => {
        return chat1.map((chat: any) => {
            return chat.properties
        })
    })
    return rChat[0][0].id
}
export const findRoomName = async (userId: any, otherUserId: any) => {
    const chat: any = await neo4j()?.cypher(`match(p:user {id:$userId}) match(p1:user {id:$otherUserId}) match(c:Chat) match(p)-->(c)  match(p1)-->(c) return c`, {
        userId,
        otherUserId
    }).catch(err => console.log(err))
    const rChat = chat.records.map((chat1: any) => {
        return chat1.map((chat: any) => {
            return chat.properties
        })
    })
    return rChat[0][0].name
}
export const findUserMessageBox = async (userId: any, chatId: any) => {

    const chat: any = await neo4j()?.cypher(`match(p:user {id:$userId})
    match(m:Message)
    match(c:Chat {id:$chatId})
    match (p)-->(c)
    match (c)<--(m)
    match (p)-->(m)
    return m`, {
        userId,
        chatId
    })
        .catch(err => console.log(err))
    const rChat = chat.records.map((chat1: any) => {
        return chat1.map((chat: any) => {
            return chat.properties
        })
    })

    return rChat[0][0]

}
export const joinRoom = async (userId: any, otherUserId: any, roomName: any) => {

    const chat: any = await neo4j()?.cypher(`match(p:user {id:$userId}) match(p1:user {id:$otherUserId}) match(c:Chat) match(p)-->(c)  match(p1)-->(c) return c`, {
        userId,
        otherUserId
    }).catch(err => console.log(err))

    const rChat = chat.records.map((chat1: any) => {
        return chat1.map((chat: any) => {
            return chat.properties
        })
    })
    if (rChat.length === 0) {
        await neo4j()?.writeCypher(`match(p1:user {id:$id}) match(c:Chat {name:$name}) match(p2:user {id:$id1}) create (p1)-[chat:${roomName}]->(c) create (p2)-[chat1:${roomName}]->(c)`, {
            id: userId,
            name: roomName,
            id1: otherUserId
        })
        return {
            message: "ok"
        }
    } else {
        return {
            message: "already room"
        }
    }
}
export const MessageBox = async (messages: any, name: any) => {
    const isMessageBox: any = await neo4j()?.cypher("match(m:Message {name:$name}) return m.name", {
        name
    }).catch(err => console.log(err))
    const isRoom1: any = isMessageBox.records.map((room1: any) => {
        return room1.map((room: any) => {
            return room
        })
    })
    if (typeof isRoom1[0] == "undefined") {
        await Message?.create({
            name,
            message: messages,
        }).catch(err => console.log(err))
        return {
            message: "successMessageCreated"
        }
    } else {
        return {
            message: "already Message Box"
        }
    }
}
export const MessageSendRel = async (userId: any, roomId: any, messageBoxName: any) => {
    const messageRel: any = await neo4j()?.cypher(`match(p:user {id:$userId}) match(m:Message {name:$messageBoxName})
    match(c:Chat {id:$roomId})
    match (p)-->(m)
    match (m)-->(c)
     return m`, {
        userId,
        roomId,
        messageBoxName
    }).catch(err => console.log(err))

    const rmessageRel = messageRel.records.map((messageRel: any) => {
        return messageRel.map((messageRel: any) => {
            return messageRel.properties
        })
    })
    if (rmessageRel.length === 0) {
        const message: any = neo4j()?.writeCypher(
            `match(p:user {id:$userId}) match(c:Chat {id:$roomId}) match(m:Message {name:$messageBoxName}) create (p)-[mUR:${messageBoxName}]->(m) create (m)-[mRR:${messageBoxName + "rel"}]->(c)`, {
            userId,
            roomId,
            messageBoxName
        }
        ).catch(err => console.log(err))
        return {
            message: "success Message Rel"
        }
    } else {
        return {
            message: "already Message Rel"
        }
    }
}
export const AddMessage = async (userId: any, chatId: any, message: any) => {
    const userMessageBox = await findUserMessageBox(userId, chatId)
    const secMessage = decrypt(message)
    const messageDes = JSON.parse(secMessage)
    let deMessage: any = decrypt(userMessageBox.message)
    let messages: any = []
    deMessage.map((item: any) => {
        messages.push(item)
    })
    messageDes.message.map((item: any) => {
        messages.push(item)
    })
    const encData = encrypt(messages)
    const messageBox: any = await neo4j()?.writeCypher('match(m:Message {id:$id}) set m.message=$message return m', {
        id: userMessageBox.id,
        message: encData
    }).catch(err => console.log(err))
    const rmessageBox = messageBox.records.map((messageBox: any) => {
        return messageBox.map((messageBox: any) => {
            return messageBox.properties
        })
    })
    return {
        message: "success message"
    }
}