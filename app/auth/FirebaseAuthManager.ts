import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, AuthProvider, GoogleAuthProvider, OAuthProvider, User, getAuth, signInWithPopup } from "firebase/auth";
import { IAuthManager, IUser } from "./IAuthManager";
import { getUserGoogleDriveProvider } from "./providers";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

export class FirebaseAuthManager implements IAuthManager {
  private readonly _auth: Auth;
  private _loggedUser: User | null = null;

  constructor() {
    const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
    this._auth = getAuth(firebaseApp);
    this._loggedUser = this._auth.currentUser;
    this._auth.onAuthStateChanged((user) => {
      this._loggedUser = user;
    });
  }

  public async getGoogleDriveCredentials() {
    const provider = getUserGoogleDriveProvider(this._auth.currentUser!.email!);
    const result = await signInWithPopup(this._auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    if (!token) {
      throw new Error("Failed to retrieve token");
    }
    return token;
  }

  public async login(): Promise<void> {
    let authProvider: AuthProvider;

    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: "select_account" });
    authProvider = googleProvider;

    const unsubscribe = this._auth.onAuthStateChanged((user) => {
      this._loggedUser = user;
      unsubscribe();
    });

    const result = await signInWithPopup(this._auth, authProvider);
    this._loggedUser = result.user;
  }

  public logout(): Promise<void> {
    return this._auth.signOut();
  }

  public getAccessToken(): Promise<string> {
    if (!this._loggedUser) {
      throw new Error("User is not logged in");
    }

    return this._loggedUser.getIdToken();
  }

  public get loggedUser(): IUser | null {
    return this._loggedUser;
  }

  public onUserChanged(callback: (user: IUser | null) => void): () => void {
    return this._auth.onAuthStateChanged(callback);
  }
}