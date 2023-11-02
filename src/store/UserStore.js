import { makeAutoObservable } from "mobx"
import { bool } from "prop-types"

export default class UserStore{
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth= bool
    }
    setUser(user) {
        this._user = user
    }
}