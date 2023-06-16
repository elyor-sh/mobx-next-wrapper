import {makeAutoObservable} from 'mobx'

export class Timer {

    second: number = 0
    constructor () {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    setSecond (t: number) {
        this.second = t
    }
}

export class BookStore {
    booksCount: number = 1

    constructor () {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    hydrate (initData?: number) {
        if(initData){
            this.booksCount = initData
        }
    }
}

export class PaperStore {
    papersCount: string = '100'

    constructor () {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    hydrate (initData?: string) {
        if(initData){
            this.papersCount = initData
        }
    }
}

export class RootStore {

    bookStore: BookStore
    paperStore: PaperStore
    timerStore: Timer

    constructor() {

        this.bookStore = new BookStore()
        this.paperStore = new PaperStore()
        this.timerStore = new Timer()

        makeAutoObservable(this, {}, {autoBind: true})
    }

}
