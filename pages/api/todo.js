// There is no need to create endpoints for every request because firebase handles that for us
// in Upstash it works different way, because u need to send a request to the endpoint to 
// get/save/delete data from the database (skipping that upstash is a key-value database, so
// there wouldn't be a way to save data basing on users, because there is no way to create
// a collection of users, and then save data for each user in a separate collection)
//

import { db } from "../../firebase"
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore"

const addTodo = async ({ userId, title, description, status }) => {
    try {
        await addDoc(collection(db, "todo"), {
            user: userId,
            title: title,
            description: description,
            status: status,
            createdAt: new Date().getTime(),
        })
    } catch (err) { }
}

const toggleTodoStatus = async ({ docId, status }) => {
    try {
        const todoRef = doc(db, "todo", docId)
        await updateDoc(todoRef, {
            status,
        })
    } catch (err) {
        console.log(err)
    }
}

const deleteTodo = async (docId) => {
    try {
        const todoRef = doc(db, "todo", docId)
        await deleteDoc(todoRef)
    } catch (err) {
        console.log(err)
    }
}

const changeTodo = async ({ docId, title, description }) => {
    try {
        const todoRef = doc(db, "todo", docId)
        await updateDoc(todoRef, {
            title,
            description,
        })
    } catch (err) {
        console.log(err)
    }
}

export { addTodo, toggleTodoStatus, deleteTodo, changeTodo }