import express from 'express'

const app = express.Router()


//! Controller
import { UserController } from '../controller/user.controller'



//? Get
export const getUser = app.get('/', UserController.getUser)
export const getUserId = app.get('/id', UserController.getUserId)

export const getFollowUser = app.get('/getFollow', UserController.getFollowUser)
export const getFollowersUser = app.get('/getFollowers', UserController.getFollowersUser)


export const getFindRoomId = app.get('/getFindRoomId', UserController.getChatFindRoom)
export const getFindRoomName = app.get('/getFindRoomName',  UserController.getChatFindRoomName)

//* Post
export const postUser = app.post('/create', UserController.createUser)
export const signUser = app.post('/sign', UserController.signUser)
/* export const logoutUser = app.post('/logout', UserController.logoutUser) */
export const followUser = app.post('/follow', UserController.followUser)
export const unFollowUser = app.post('/unFollow', UserController.unFollowUser)

export const postSendMessage = app.post('/sendMessage', UserController.postChatSendMessage)
export const postJoinRoom = app.post('/joinRoom',  UserController.postChatJoinRoom)
export const postSendSol = app.post('/sendSol',  UserController.paySol)



//? Update
export const putUser = app.put('/update', UserController.updateUser)

//! Delete
export const deleteUser = app.delete('/delete', UserController.deleteUser)
