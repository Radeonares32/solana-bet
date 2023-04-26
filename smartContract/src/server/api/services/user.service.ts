//! Dal
import { UserDal } from '../dal/user.dal'


//* Security
import { decrypt, encrypt } from '../security/crypto.sec'

import { sendingSol } from '../smart/smart'

//* Cache
export class UserService {
    private userDataAcess: UserDal = new UserDal()
    userFindAll() {
        return this.userDataAcess.findAll()
    }
    async userFind(id: string) {
        return {
            user: await this.userDataAcess.find(id),

        }
    }
    userDelete(id: string) {

        return {

            delete: this.userDataAcess.delete(id)
        }


    }
    userUpdate(id: string, name: string, surname: string, email: string, coin: number, password: string) {

        return {
            update: this.userDataAcess.update(id, name, surname, email, coin, password)
        }




    }
    async userCreate(name: string, surname: string, email: string, coin: number, password: string) {


        return {
            create: this.userDataAcess.create(name, surname, email, coin, password),
        }


    }
    async userFollow(follow: string, followers: string) {
        if (follow || followers) {
            return {
                follow: this.userDataAcess.follow(follow, followers),
            }
        }
        else {
            return {
                message: "follow || followers prop empty"
            }
        }
    }
    async userUnFollow(follow: string, followers: string) {
        if (follow || followers) {
            return {
                follow: this.userDataAcess.unFollow(follow, followers),
            }
        }
        else {
            return {
                message: "follow || followers prop empty"
            }
        }
    }
    async userGetFollow(id: string) {
        if (id) {
            return {
                follow: await this.userDataAcess.getFollow(id),
            }
        }
        else {
            return {
                message: "id prop empty"
            }
        }
    }
    async paySol(id: string,coin:number) {
        if (id) {

            const sendSol = await sendingSol(coin)
           
            if(sendSol.err) {
                return {
                    payment:"sol yetersiz"
                }
            }
            else {
                return {
                    payment: await this.userDataAcess.paySol(id,coin),
                }
            }

            
        }
        else {
            return {
                message: "id prop empty"
            }
        }
    }
    async userGetFollowers(id: string) {
        if (id) {
            return {
                followers: await this.userDataAcess.getFollowers(id),
            }
        }
        else {
            return {
                message: "id prop empty"
            }
        }
    }




    async userFindEmail(email: string) {
        if (email) {
            return {
                userEmail: await this.userDataAcess.getUserEmail(email),
            }
        }
        else {
            return {
                message: "id roleId prop empty"
            }
        }
    }
    async userSign(email: string, password: string) {


        const isUser: any = await this.userDataAcess.getUserEmail(email)
        if (isUser.length > 0) {



            try {
                return {
                    token: ""
                }

            } catch {
                return {
                    token: ""
                }
            }
        }
        else {
            return {
                sign: "users not fount"
            }
        }
    }


    /*   async userLogout(token: string) {
          try {
              const delToken = await cache.redis.Token.deleteToken(token)
              if (delToken.message) {
                  return {
                      message: delToken.message
                  }
              }
              else {
                  return {
                      message: delToken.status
                  }
  
              }
          }
          catch (err) {
              return {
                  message: err
              }
          }
      } */

    async userChatSendMessage(userId: any, otherUserId: any) {
        if (userId && otherUserId) {
            return {
                chat: await this.userDataAcess.chatSendMessage(userId, otherUserId),
            }
        }
        else {
            return {
                message: "userId otherUserId prop empty"
            }
        }
    }
    async userChatJoinRoom(userId: any, otherUserId: any) {
        if (userId && otherUserId) {
            return {
                chat: await this.userDataAcess.chatJoinRoom(userId, otherUserId),
            }
        }
        else {
            return {
                message: "userId otherUserId prop empty"
            }
        }
    }
    async userFindRoomId(userId: any, otherUserId: any) {
        if (userId && otherUserId) {
            return {
                chat: await this.userDataAcess.chatFindRoom(userId, otherUserId),
            }
        }
        else {
            return {
                message: "userId otherUserId prop empty"
            }
        }
    }
    async userFindRoomName(userId: any, otherUserId: any) {
        if (userId && otherUserId) {
            return {
                chat: await this.userDataAcess.chatFindRoomName(userId, otherUserId),
            }
        }
        else {
            return {
                message: "userId otherUserId prop empty"
            }
        }
    }
}