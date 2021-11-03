import { initializeApp } from '@firebase/app'
import {
  getFirestore,
  collection,
  onSnapshot,
  deleteField,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
  DocumentReference,
} from '@firebase/firestore'
import type { Unsubscriber } from 'svelte/store'
import pickBy from 'lodash/pickBy'
import mapValues from 'lodash/mapValues'

const app = initializeApp({
  apiKey: 'AIzaSyAWkeD8rQ8yPIjjqaXv-yOK5hzH6daJInM',
  authDomain: 'martin-one.firebaseapp.com',
  databaseURL: 'https://martin-one.firebaseio.com',
  projectId: 'martin-one',
  storageBucket: 'martin-one.appspot.com',
  messagingSenderId: '76774528166',
  appId: '1:76774528166:web:dc4b3315da42694c',
})

const db = getFirestore(app)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getAll(coll: string) {
  try {
    const snapshot = await getDocs(collection(db, coll))
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch {
    return []
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function loadCollection(coll: string) {
  try {
    const snapshot = await getDocs(collection(db, coll))

    return {
      props: { data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) },
    }
  } catch (err) {
    return {
      status: 501,
      error: err.message,
    }
  }
}

export function watchCollection<T>(name: string, cb: (items: T[]) => void): Unsubscriber {
  return onSnapshot(collection(db, name), snapshot => {
    const items = []
    snapshot.forEach(doc => {
      const item = { id: doc.id, ...doc.data() }
      items.push(item)
    })
    cb(items)
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getOne(coll: string, id: string) {
  try {
    const snapshot = await getDoc(doc(db, coll, id))
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
  } catch {
    return null
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function loadDoc(coll: string, id: string) {
  try {
    const snapshot = await getDoc(doc(db, coll, id))

    if (snapshot.exists()) {
      return {
        props: { data: { id: snapshot.id, ...snapshot.data() } },
      }
    }
  } catch (err) {
    return {
      status: 501,
      error: err.message,
    }
  }
}

export function watchDoc(name: string, id: string, cb: (item) => void): Unsubscriber {
  return onSnapshot(doc(db, name, id), snapshot => {
    const item = { id: snapshot.id, ...snapshot.data() }
    cb(item)
  })
}

export const NULL = deleteField()

function is_null(v) {
  return v == null || v === false || v === '' || (Array.isArray(v) && v.length == 0)
}

function deflate(obj: Record<string, unknown>): Record<string, unknown> {
  // console.log(obj)
  return mapValues(obj, v => {
    if (typeof v === 'string') v = v.trim()
    return is_null(v) ? NULL : v
  })
}

export function saveDoc<T extends Record<string, unknown>>(
  coll: string,
  id: string,
  obj: T,
): Promise<void> {
  return updateDoc(doc(db, coll, id), deflate(obj))
}

export function makeDoc<T extends Record<string, unknown>>(
  coll: string,
  obj: T,
): Promise<DocumentReference<unknown>> {
  return addDoc(
    collection(db, coll),
    pickBy(obj, (v: unknown) => !is_null(v)),
  )
}
