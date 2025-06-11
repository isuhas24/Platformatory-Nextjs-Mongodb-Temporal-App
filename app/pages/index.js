import { useRouter } from "next/router";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase";
import axios from "axios";
import styles from "../styles/Signup.module.css";
import { FaGoogle } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);

      const newUser = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        phone: "",
      };

      localStorage.setItem("user", JSON.stringify(newUser));
      await axios.post("/api/signup", newUser);
      router.push("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome</h1>
        <p className={styles.description}>
          Sign up instantly and securely using your Google account.
        </p>
        <button className={styles.button} onClick={handleSignup}>
          <FaGoogle className={styles.googleIcon} />
          <span>Sign Up with Google</span>
        </button>
      </div>
    </div>
  );
}
