import { Handler } from 'express'
//! Service
import { UserService } from '../services/user.service'

export class UserController {
    static getUser: Handler = async (req, res) => {
        const user = await new UserService().userFindAll()
        res.json({ user })
    }
    static getUserId: Handler = async (req, res) => {
        const { id } = req.body
        const user = new UserService().userFind(id)
        res.json({ user: await user })
    }
    static createUser: Handler = async (req, res) => {
        const userService = new UserService()
        const { name, surname, email, password, passwordRepeat, coin } = req.body

        if (password !== passwordRepeat) {
            res.json({
                error: "password not match"
            })
        }
        else {
            const user = await userService.userCreate(name, surname, email, coin, password)
            res.json({
                message:"added"
            })

        }
    }
    static paySol: Handler = async (req, res) => {
        const userService = new UserService()
        const { id, coin } = req.body
        const sol = await userService.paySol(id, coin)
        res.json({
            message: sol.payment
        })
    }
    static updateUser: Handler = async (req, res) => {
        const userService = new UserService()
        const { id, name, surname, email, password, coin } = req.body


        const user = userService.userUpdate(id, name, surname, email, password, coin)
        res.json({
            message:"updated"
        })


    }
    static deleteUser: Handler = async (req, res) => {
        const userService = new UserService()
        const { id } = req.body
        const user = userService.userDelete(id)

    }
    static signUser: Handler = async (req, res) => {
        const userService = new UserService()
        const { email, password } = req.body
        const user = await userService.userSign(email, password)
        if (user.token) {
            res.json(user.token)
        }
        else {
            res.json(user.sign)
        }
    }
    /* 
    static logoutUser: Handler = async ({ headers }, res) => {
        const userService = new UserService()
        const token = headers['x-access-token']
        if (token) {
            const user = await userService.userLogout(token as string)
            res.status(200).json({
                message: user.message
            })
        }
        else {
            res.status(401).json({
                message: "not found token"
            })
        }
    } */
    static followUser: Handler = async (req, res) => {
        const userService = new UserService()
        const { follow, followers } = req.body
        if (follow && followers) {
            const user = await userService.userFollow(follow, followers)
            res.status(200).json({
                message: await user.follow
            })
        }
        else {
            res.status(401).json({
                message: "not found token"
            })
        }
    }
    static unFollowUser: Handler = async (req, res) => {
        const userService = new UserService()
        const { follow, followers } = req.body
        if (follow && followers) {
            const user = await userService.userUnFollow(follow, followers)
            res.status(200).json({
                message: await user.follow
            })
        }
        else {
            res.status(401).json({
                message: "not found token"
            })
        }
    }
    static getFollowUser: Handler = async (req, res) => {
        const userService = new UserService()
        const { follow } = req.body
        if (follow) {
            const user = await userService.userGetFollow(follow)
            res.status(200).json({
                user: user.follow
            })
        }
        else {
            res.status(401).json({
                message: "not found token"
            })
        }
    }
    static getFollowersUser: Handler = async (req, res) => {
        const userService = new UserService()
        const { followers } = req.body
        if (followers) {
            const user = await userService.userGetFollowers(followers)
            res.status(200).json({
                user: user.followers
            })
        }
        else {
            res.status(401).json({
                message: "not found token"
            })
        }
    }




    static postChatSendMessage: Handler = async (req, res) => {
        const userService = new UserService()
        const { userId, otherUserId } = req.body
        if (userId && otherUserId) {
            const user = await userService.userChatSendMessage(userId, otherUserId)
            res.status(200).json({
                user: user.chat
            })
        }
        else {
            res.status(401).json({
                message: "not found token"
            })
        }
    }
    static postChatJoinRoom: Handler = async (req, res) => {
        const userService = new UserService()
        const { userId, otherUserId } = req.body
        if (userId && otherUserId) {
            const user = await userService.userChatJoinRoom(userId, otherUserId)
            res.status(200).json({
                user: user.chat
            })
        }
        else {
            res.status(401).json({
                message: "not found token"
            })
        }
    }
    static getChatFindRoom: Handler = async (req, res) => {
        const userService = new UserService()
        const { userId, otherUserId } = req.body
        if (userId && otherUserId) {
            const user = await userService.userFindRoomId(userId, otherUserId)
            res.status(200).json({
                user: user.chat
            })
        }
        else {
            res.status(401).json({
                message: "not found token"
            })
        }
    }
    static getChatFindRoomName: Handler = async (req, res) => {
        const userService = new UserService()
        const { userId, otherUserId } = req.body
        if (userId && otherUserId) {
            const user = await userService.userFindRoomName(userId, otherUserId)
            res.status(200).json({
                user: user.chat
            })
        }
        else {
            res.status(401).json({
                message: "not found token"
            })
        }
    }
}