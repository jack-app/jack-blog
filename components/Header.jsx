import styles from "./Header.module.css";
import Image from "next/image";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.titles}>
        <div className={styles.mainTitle}>jack blog</div>
        <div className={styles.subTitle}>アプリ開発団体jack メンバーズブログ</div>
      </div>
      <div className={styles.overlay}></div>
      <Image src="/HeaderBackground.png" fill></Image>
    </header>
  );
}
