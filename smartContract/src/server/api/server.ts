import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
const app = express()
export const server = http.createServer(app)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

import { deleteUser,
    followUser,
    getFindRoomId,
    getFindRoomName,
    getFollowUser,
    getFollowersUser,
    getUser,
    getUserId,
    postJoinRoom,
    postSendMessage,
    postSendSol,
    postUser,
    putUser,
    signUser,
    unFollowUser
 } from './routes/user.routes'

app.use('/user',
deleteUser,
followUser,
getFindRoomId,
getFindRoomName,
getFollowUser,
getFollowersUser,
getUser,
getUserId,
postJoinRoom,
postSendMessage,
postSendSol,
postUser,
putUser,
signUser,
unFollowUser
)



server.listen(3000,()=>{
    console.log("server");
})