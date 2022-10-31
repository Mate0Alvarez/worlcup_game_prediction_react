import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    addDoc, collection, getDocs, limit,
    orderBy, query,
    where
} from "firebase/firestore";
import { IGames, IUser, IUserPredictionSaved } from "../interfaces/interfaces";
import { auth, db } from "./firebase_connection";

export const getGames = async (): Promise<IGames[] | undefined> => {
    const gamesCollection = query(collection(db, "games"), orderBy("date"));

    try {
        const res = await getDocs(gamesCollection);
        const games = res.docs.map((c) => ({
            id: c.id,
            local: c.data().local,
            local_score: c.data().local_score,
            local_code: c.data().local_code,
            visitor: c.data().visitor,
            visitor_score: c.data().visitor_score,
            visitor_code: c.data().visitor_code,
            status: c.data().status,
            final_result: c.data().final_result,
            date: c.data().date,
        }));
        return games;
    } catch (error) {
        console.log("Something happended", error);
    }
};

export const registerWithEmailAndPassword = async (
    name: string,
    email: string,
    password: string
): Promise<void> => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.error(error);
    }
};

export const logInWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<string> => {
    const user = await signInWithEmailAndPassword(auth, email, password);

    return user.user.uid;
};

export const logout = async (): Promise<void> => {
    signOut(auth);
};

export const sendPasswordReset = async (email: string): Promise<boolean> => {
    try {
        await sendPasswordResetEmail(auth, email);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const getUser = async (
    uid: string | undefined
): Promise<IUser | null> => {
    try {
        if (uid === undefined) return null;

        const userCollection = query(
            collection(db, "users"),
            where("uid", "==", uid),
            limit(1)
        );

        const res = await getDocs(userCollection);
        if (res.size) {
            const user = res.docs.map((c) => ({
                id: c.id,
                name: c.data().name,
                email: c.data().email,
            }));
            return user[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getUserPredictions = async (
    user_id: string
): Promise<IUserPredictionSaved[] | []> => {
    const userPredictionsCollection = query(
        collection(db, "predictions"),
        where("user_id", "==", user_id),
        limit(1)
    );

    try {
        const res = await getDocs(userPredictionsCollection);

        const predictions = res.docs.map((c) => ({
            game_id: c.data().game_id,
            local_score: c.data().result.local_score,
            visitor_score: c.data().result.visitor_score,
            result: c.data().result.result,
        }));

        return predictions;
    } catch (error) {
        console.error(error);
        return [];
    }
};


/* export const getCategories = async () => {
    const categoriesCollection = collection(db, "categories");

    try {
        const res = await getDocs(categoriesCollection);
        const categories = res.docs.map((c) => ({ id: c.id, ...c.data() }));
        return categories;
    } catch (error) {
        console.log("Something happended", error);
    }
};

export const getCategory = async (key) => {
    const categoryCollection = query(
        collection(db, "categories"),
        where("key", "==", key),
        limit(1)
    );

    try {
        const res = await getDocs(categoryCollection);
        if (res.size) {
            const categories = res.docs.map((c) => ({ id: c.id, ...c.data() }));
            return categories[0];
        } else {
            return null;
        }
    } catch (error) {
        console.log("Something happended", error);
    }
};

export const getProducts = async (category = null) => {
    let productsCollection;

    if (category) {
        productsCollection = query(
            collection(db, "items"),
            where("category_key", "==", category)
        );
    } else {
        productsCollection = collection(db, "items");
    }

    try {
        const res = await getDocs(productsCollection);
        const products = res.docs.map((p) => ({ id: p.id, ...p.data() }));
        return products;
    } catch (error) {
        console.log("Something happended", error);
    }
};

export const getProduct = async (id) => {
    const productRef = doc(db, "items", id);

    try {
        const res = await getDoc(productRef);
        if (res.exists()) {
            const product = { id: res.id, ...res.data() };
            return product;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Something happended", error);
    }
};

export const saveOrder = async (order) => {
    const ordersCollection = collection(db, 'orders');
    try {
        const { id } = await addDoc(ordersCollection, order)
        return id;
    } catch (error) {
        console.log('Ocurrió un error', error);
    }
}

export const getOrder = async (id) => {
    const productRef = doc(db, "orders", id);

    try {
        const res = await getDoc(productRef);
        if (res.exists()) {
            const product = { id: res.id, ...res.data() };
            return product;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Something happended", error);
    }
} */
