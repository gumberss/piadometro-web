export const USER_ID = 'USER_ID'

export function receiveUserId(userId){
    return {
        type: USER_ID,
        userId
    }
}