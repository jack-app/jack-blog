import Image from "next/image";
import styles from "./Footer.module.css";
import { MdOutlineWeb } from "react-icons/md";
import { BsTwitter } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Image src="/logo.png" width={100} height={70}></Image>
      </div>
      <div className={styles.links}>
        <MdOutlineWeb size={40}></MdOutlineWeb>
        <BsTwitter size={36}></BsTwitter>
        <MdEmail size={36}></MdEmail>
      </div>
      <div className={styles.copy}>&copy;jack 2023</div>
    </footer>
  );
}
