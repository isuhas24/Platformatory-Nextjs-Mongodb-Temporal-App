import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [uid, setUid] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return router.push("/");
    setUid(user.uid);
    fetchUser(user.uid);
  }, []);

  const fetchUser = async (uid) => {
    const res = await axios.get(`/api/user?uid=${uid}`);
    setForm(res.data);
  };

  const updateUser = async () => {
    await axios.post("/api/update", { uid, ...form });
    alert("Updated in all DBs!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Dashboard</h1>
        <input
          className={styles.input}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className={styles.input}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className={styles.input}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <button className={styles.button} onClick={updateUser}>
          Update
        </button>
      </div>
    </div>
  );
}
