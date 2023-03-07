

import { Server } from 'socket.io'


import { v4 as uuid } from 'uuid'


//? Models
import { User } from '../models/user.models'

//? DataBase
import { neo4j } from '../db/neo4j'


//? Security 
import { decrypt,encrypt } from '../security/crypto.sec'


//? Server
import { server } from '../server'
//? Chat
import { AddMessage,MessageBox,MessageSendRel,createRoom,findRoom,findRoomName,findUser,findUserMessageBox,joinRoom } from '../chat/chat'

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})


export class UserDal {
    async delete(id: string): Promise<{ message: string }> {
        return new Promise(async (resolve, reject) => {
            try {
                await neo4j()?.writeCypher("match (u:user {id:$id}) detach delete u", { id: id })
                return resolve({ message: "Success deleted" })
            }
            catch (err) {
                return reject({ message: "Error " + err })
            }
        })
    }
    async create(name: string, surname: string, email: string, coin:number, password: string,): Promise<{ message: string }> {
        return new Promise(async (resolve, reject) => {
            try {
                await User?.create({ name, surname, email, coin, password})
                resolve({ message: "Success created" })
            } catch (err) {
                reject({ message: "Error " + err })
            }
        })
    }
    async find(id: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const user: any = await neo4j()?.cypher("match (u:user {id:$id}) return u.id,u.name,u.surname,u.email,u.coin,u.password", { id })
                const rUser = user.records.map((uss: any) => {
                    return uss.map((res: any) => {
                        return res
                    })
                })
                resolve(rUser as any)
            }
            catch (err) {
                reject({ message: "Error " + err })
            }
        })
    }
    async findAll(): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const user: any = await neo4j()?.cypher("match (u:user) return u", {})
                const rUser = user.records.map((uss: any) => {
                    return uss.map((res: any) => {
                        return res.properties
                    })
                })
                resolve(rUser as any)
            }
            catch (err) {
                reject({ message: "Error " + err })
            }
        })
    }
    async update(id: string, name: string, surname: string, email: string, coin:number, password: string): Promise<{ message: string }> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await neo4j()?.writeCypher("match (u:user {id:$id}) set u.name=$name,u.surname=$surname,u.email=$email,u.coin=$coin,u.password=$password return u", {
                    id, name, surname, email, coin,password
                }).catch(err => console.log(err))
                resolve({ message: "Success update" })
            }
            catch (err) {
                reject({ message: "Error " + err })
            }
        })
    }
    async follow(follow: string, followers: string): Promise<{ message: string }> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await neo4j()?.writeCypher("match (f1:user {id:$follow}) match(f2:user {id:$followers}) create(f1)-[follow:FOLLOW]->(f2) create (f2)-[followers:FOLLOWERS]->(f1) ", { follow, followers });

                resolve({ message: "Success following" })
            }
            catch (err) {
                reject({ message: "Error " + err })
            }
        })
    }
    async unFollow(follow: string, followers: string): Promise<{ message: string }> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await neo4j()?.writeCypher("match(f1:user {id:$follow})-[follow:FOLLOW]->(f2:user {id:$followers}) match(f2:user {id:$followers})-[followers:FOLLOWERS]->(f1:user {id:$follow}) delete followers,follow", { follow, followers })
                resolve({ message: "Success un follow" })
            }
            catch (err) {
                reject({ message: "Error " + err })
            }
        })
    }
    async getFollow(id: string): Promise<{ message: string }> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await neo4j()?.cypher("match (n:user {id:$id})-[follow:FOLLOW]->(n1:user) return n1.id,n1.name,n1.surname,n1.email,n1.image,n1.phone,n1.password,n1.dateOfBirth,n1.gender,n1.basket,n1.order,n1.creditCardName,n1.creditCardSurname,n1.creditCardNumber,n1.creditCardCvv,n1.city,n1.country,n1.address,n1.zipCode,n1.expireMonth,n1.expireYear,n1.identityNumber", { id: id })
                const rUser = user?.records.map(uss => {
                    return uss.map(res => {
                        return res
                    })
                })
                resolve(rUser as any)
            }
            catch (err) {
                reject({ message: "Error " + err })
            }
        })
    }
    async getFollowers(id: string): Promise<{ message: string }> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await neo4j()?.cypher("match (n:user {id:$id})-[followers:FOLLOWERS]->(n1:user) return  n1.id,n1.name,n1.surname,n1.email,n1.image,n1.phone,n1.password,n1.dateOfBirth,n1.gender,n1.basket,n1.order,n1.creditCardName,n1.creditCardSurname,n1.creditCardNumber,n1.creditCardCvv,n1.city,n1.country,n1.address,n1.zipCode,n1.expireMonth,n1.expireYear,n1.identityNumber", { id: id })
                const rUser = user?.records.map(uss => {
                    return uss.map(res => {
                        return res
                    })
                })
                resolve(rUser as any)
            }
            catch (err) {
                reject({ message: "Error " + err })
            }
        })
    }
    
 
  
  
   
  
    async getUserEmail(email: string): Promise<{ message: string }> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await neo4j()?.cypher("match (u:user {email:$email}) return u.email,u.password", { email })
                const rUser = user?.records.map(uss => {
                    return uss.map(res => {
                        return res
                    })
                })
                resolve(rUser as any)
            }
            catch (err) {
                reject({ message: "Error " + err })
            }
        })
    }
    async getSign(email: string, password: string): Promise<{ message: string }> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await neo4j()?.cypher("match (u:user {email:$email,password:$password}) return u", { email, password })
                const rUser = user?.records.map(uss => {
                    return uss.map(res => {
                        return res.properties
                    })
                })
                resolve(rUser as any)
            }
            catch (err) {
                reject({ message: "Error " + err })
            }
        })
    }

    async chatJoinRoom(userId: any, otherUserId: any): Promise<{ message: string }> {
        return new Promise(async (resolve, reject) => {
            try {
                const user: any = await this.find(userId)
                const user1: any = await this.find(otherUserId)

                let roomName = user[0][1] + user[0][2] + user1[0][1] + user1[0][2]
                let reRoomName = user1[0][1] + user1[0][2] + user[0][1] + user[0][2]
                const isCreateRoom = await createRoom(roomName, reRoomName)
                const isJoinRoom = await joinRoom(userId, otherUserId, roomName)
                resolve({
                    message: isJoinRoom.message,
                    createMessage: isCreateRoom.message
                } as any)
            }
            catch (err) {
                reject({ message: "Error " + err })
            }
        })
    }
    async chatSendMessage(userId: any, otherUserId: any): Promise<{ message: string }> {
        return new Promise(async (resolve, reject) => {
            try {
                const user: any = await this.find(userId)
                const user1: any = await this.find(otherUserId)

                let messageBoxName: any = user[0][1] + user[0][2] + user1[0][1] + user1[0][2] + "box"
                const mess = await MessageBox("empty", messageBoxName)

                const room = await findRoom(userId, otherUserId)

                const roomName = await findRoomName(userId, otherUserId)

                const me = await findUserMessageBox(userId, room)

                let reRoomName = user1[0][1] + user1[0][2] + user[0][1] + user[0][2]
                const isCreateRoom = await createRoom(roomName, reRoomName)

                const isJoinRoom = await joinRoom(userId, otherUserId, roomName)

                const messageRel = await MessageSendRel(userId, room, messageBoxName)
                io.on('connection', (socket) => {
                    socket.on(roomName, (data: any, cb: any) => {

                        AddMessage(userId, room, data)
                    })
                })
                resolve({
                    message: mess.message,
                    messageRel: messageRel.message
                } as any)
            }
            catch (err) {
                reject({ message: "Error " + err })
            }
        })
    }
    async chatFindRoom(userId: any, otherUserId: any): Promise<{ message: string }> {
        return new Promise(async (resolve, reject) => {
            try {
                const findRooms = await findRoom(userId, otherUserId)
                resolve({
                    room: findRooms
                } as any)
            }
            catch (err) {
                reject({ message: "Error " + err })
            }
        })
    }
    async chatFindRoomName(userId: any, otherUserId: any): Promise<{ message: string }> {
        return new Promise(async (resolve, reject) => {
            try {
                const findRoom = await findRoomName(userId, otherUserId)
                resolve({
                    room: findRoom
                } as any)
            }
            catch (err) {
                reject({ message: "Error " + err })
            }
        })
    }
}