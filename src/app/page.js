
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <h1>oi pessoal, bem vindos ao meu site 😼</h1>
        <p className={styles.paragrafo}>oi pessoal</p>
        {/* <Image src='/images.jpg' width={300} heigth={300} alt="passaro" /> */}
        <Image src='/images.jpg' width={300} height={300} alt="Passaro" loading="eager"/>
      </main>
    </div>
  );
}
