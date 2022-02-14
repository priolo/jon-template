import { getStore, useStore } from "@priolo/jon"


/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} username
 * @property {boolean} has_to_change_password
 * @property {string} role
 * 
 * 
 * @typedef {Object} StateAuth
 * @property {User} user
 * @property {string} token
 * @property {string} username
 * @property {string} oldPassword
 * @property {string} password
 * @property {string} repassword
 * @property {boolean} isChangePasswordOpen
 * 
 * @typedef {Object} GettersAuth
 * @property {()=>boolean} isLogged
 * @property {()=>boolean} isRepassword
 * 
 * @typedef {Object} ActionsAuth
 * @property {()=>Promise<void>} login
 * @property {({flash:boolean=false})=>Promise<void>} logout
 * @property {()=>Promise<void>} refresh
 * @property {()=>Promise<{ error:boolean }>} changePassword
 * @property {()=>Promise<void>} fetchCurrentUser
 * @property {()=>Promise<void>} refreshToken
 * @property {()=>Promise<void>} startPollingRefreshToken
 * @property {()=>Promise<void>} stopPollingRefreshToken
 * 
 * @typedef {Object} MutatorsAuth
 * @property {(user:User)=>void} setUser
 * @property {(token:string)=>void} setToken
 * @property {(isChangePasswordOpen:boolean)=>void} setIsChangePasswordOpen
 * @property {(userName:string)=>void} setUsername
 * @property {(user:string)=>void} setPassword
 * @property {(oldPassword:string)=>void} setOldPassword
 * @property {(password:string)=>void} setRepassword
 * @property {(repassword:string)=>void} resetTexts
 * 
 * @typedef {(GettersAuth & ActionsAuth & MutatorsAuth)} StoreAuth
 * @property {StateAuth} state
 */



/**
 * @returns {StoreAuth}
 */
export function getStoreAuth() {
	return getStore("auth")
}

/**
 * @returns {StoreAuth}
 */
export function useAuth() {
	return useStore("auth")
}
