import React, { useContext, useState } from "react";
import styles from "./UserAuth.module.scss";
import Button from "../Button/Button";
import { FirebaseError, analytics, auth, firestore, googleAuthProvider } from "../../components/utils/firebase";
import { UserContext } from "../utils/context";
import { ReactComponent as UserIcon } from "../../assets/user.svg";

/**
 * Sign in with Google handler
 */
const signInWithGoogle = async () => {
  try {
    await auth.signInWithPopup(googleAuthProvider);
    analytics.logEvent("login", { method: "Google" });
    if (auth.currentUser?.uid) {
      analytics.setUserId(auth.currentUser.uid);
    }
  } catch (error: FirebaseError | any) {
    console.error(error);
    analytics.logEvent("login_error", {
      method: "Google",
      error: error?.code,
      error_message: error?.message,
    });
  }
};

/**
 * Username form component with simplified functionality.
 * Allows the user to enter any username without additional checks.
 */
const UsernameForm = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) return;
    setLoading(true);
    try {
      const userDoc = firestore.doc(`users/${user?.uid}`);
      const usernameDoc = firestore.doc(`usernames/${username}`);
      const batch = firestore.batch();
      batch.set(userDoc, { username, photoURL: user?.photoURL });
      batch.set(usernameDoc, { uid: user?.uid });
      await batch.commit();
      analytics.logEvent("username_set", { username });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className={styles.usernameform}>
      <h3 className={styles.usernameform__title}>Choose Your Username</h3>
      <input
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.usernameform__input}
      />
      <Button type="submit" disabled={loading} label="Submit" againstpage />
    </form>
  );
};

/**
 * User authentication component: renders sign in, username form, or log out views
 */
const UserAuth = () => {
  const { user, username } = useContext(UserContext);
  const [userPhoto, setUserPhoto] = useState<string | undefined>(
    user && user.photoURL ? user.photoURL : undefined
  );

  const handleImageError = () => {
    setUserPhoto(undefined);
  };

  return (
    <div>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <div className={styles.logout}>
            {userPhoto ? (
              <img
                src={userPhoto}
                alt="user avatar"
                className={styles.logout__avatar}
                onError={handleImageError}
              />
            ) : (
              <UserIcon className={styles.logout__avatar} />
            )}
            <p className={styles.logout__username}>{username}</p>
            <Button onClick={() => auth.signOut()} label="Log Out" againstpage />
          </div>
        )
      ) : (
        <div className={styles.login}>
          <Button onClick={signInWithGoogle} label="Sign in with Google" againstpage />
        </div>
      )}
    </div>
  );
};

export default UserAuth;