import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../lib/firebase";
// import axios from "../lib/axios";
import axios from "axios";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const newUser = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        phone: "", // default empty
      };

      localStorage.setItem("user", JSON.stringify(newUser));

      // insert into DB
      await axios.post("/api/signup", newUser);

      router.push("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up With Google</h1>
      <button className={styles.button} onClick={handleSignup}>
        Sign Up
      </button>
    </div>
  );
}
