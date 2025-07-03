import { reactive } from 'vue'
import { auth, db } from './firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    getDocs,
    Timestamp
} from 'firebase/firestore'

export const state = reactive({
    user: null,
    tasks: [],

    async signUp(firstName, lastName, email, password) {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        await addDoc(collection(db, 'users'), {
            userId: cred.user.uid,
            firstName,
            lastName,
            email
        })
        this.user = { userId: cred.user.uid, firstName, lastName, email }
    },

    async signIn(email, password) {
        const cred = await signInWithEmailAndPassword(auth, email, password)
        const q = query(collection(db, 'users'), where('userId', '==', cred.user.uid))
        const snap = await getDocs(q)
        const userData = snap.docs[0].data()
        this.user = userData
    },

    async signOut() {
        await signOut(auth)
        this.user = null
        this.tasks = []
    },

    listenAuthState() {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const q = query(collection(db, 'users'), where('userId', '==', user.uid))
                const snap = await getDocs(q)
                const userData = snap.docs[0].data()
                this.user = userData
                await this.loadTasks()
            } else {
                this.user = null
                this.tasks = []
            }
        })
    },

    async loadTasks() {
        const snapTasks = await getDocs(collection(db, 'tasks'))
        const snapUsers = await getDocs(collection(db, 'users'))

        const users = {}
        snapUsers.docs.forEach(doc => {
            const userData = doc.data()
            users[userData.userId] = userData
        })

        this.tasks = snapTasks.docs.map(doc => {
            const task = doc.data()
            const owner = users[task.ownerId] || { firstName: '???', lastName: '' }
            return {
                id: doc.id,
                ...task,
                firstName: owner.firstName,
                lastName: owner.lastName
            }
        })

        this.sortTasks()
    }
    ,

    sortTasks() {
        this.tasks.sort((a, b) => new Date(b.date) - new Date(a.date))
    },

    async createTask(title, description) {
        const task = {
            ownerId: this.user.userId,
            title,
            description,
            isDone: false,
            date: Timestamp.now().toDate().toISOString()
        }
        const docRef = await addDoc(collection(db, 'tasks'), task)
        this.tasks.unshift({ id: docRef.id, ...task })
    },

    async updateTask(id, newData) {
        const ref = doc(db, 'tasks', id)
        await updateDoc(ref, newData)
        const index = this.tasks.findIndex(t => t.id === id)
        if (index !== -1) {
            this.tasks[index] = { ...this.tasks[index], ...newData }
            this.sortTasks()
        }
    },

    async deleteTask(id) {
        await deleteDoc(doc(db, 'tasks', id))
        this.tasks = this.tasks.filter(t => t.id !== id)
    },

    get myTasks() {
        return this.tasks.filter(t => t.ownerId === this.user?.userId && !t.isDone)
    },

    get otherTasks() {
        return this.tasks.filter(t => t.ownerId !== this.user?.userId && !t.isDone)
    },

    get archivedTasks() {
        return this.tasks.filter(t => t.isDone)
    }
})
