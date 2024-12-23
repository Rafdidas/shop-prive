import { initializeApp } from 'firebase/app';
import {
    User, 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    NextOrObserver,
    onAuthStateChanged,
 } from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    QueryDocumentSnapshot
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAWjm0XwLwEuvUbBrPYYo7Z27P5xY-R5YE",
  authDomain: "prive-f2d8a.firebaseapp.com",
  projectId: "prive-f2d8a",
  storageBucket: "prive-f2d8a.firebasestorage.app",
  messagingSenderId: "490173644451",
  appId: "1:490173644451:web:c390ed0c8b27091d7a4916"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWhithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type AdditionalInformation = {
  displayName?: string;
}

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
}

// Firebase 인증을 통해 로그인한 유저의 정보를 Firestore 데이터베이스에 저장
export const createUserDocumentFromAuth = async (
  userAuth: User, 
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return; // userAuth: Firebase 인증을 통해 전달된 유저 객체

  const userDocRef = doc(db, "users", userAuth.uid); // Firestore에서 'users' 컬렉션의 특정 문서를 참
  const userSnapshot = await getDoc(userDocRef); // getDoc(): Firestore에서 해당 유저 문서의 스냅샷을 가져옴

  // 유저데이터 존재 x 유저 데이터가 없다면, 아래의 코드 블록에서 새 유저 데이터를 생성
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth; // Firebase 인증 시 제공된 유저 정보
    const createdAt = new Date(); // 유저가 데이터베이스에 처음 저장되는 시점을 기록하기 위해 현재 날짜를 생성

    // setDoc(): Firestore에 유저 문서를 생성
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation, // 이 부분은 유저 정보가 Firestore에 없는 경우에만 실행
      });
    } catch (error) {
      console.log("error creating the user", error);
    }
  }
  // 유저 데이터 존재
  return userSnapshot as QueryDocumentSnapshot<UserData>; //유저의 문서 참조(userDocRef)를 반환
};

// 이메일과 비밀번호로 Firebase 인증을 통해 새로운 유저를 생성하는 함수
export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if(!email || !password) return;
  
  return await createUserWithEmailAndPassword(auth, email, password);
}
// 이메일과 비밀번호로 로그인하는 함수
export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  
  return await signInWithEmailAndPassword(auth, email, password);
};
// 현재 로그인한 유저를 로그아웃하는 함수
export const signOutUser = async () => await signOut(auth);
// 유저의 로그인 상태가 변경될 때마다 특정 콜백 함수를 호출
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
