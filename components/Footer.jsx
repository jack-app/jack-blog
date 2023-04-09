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
        <a href="https://jack-website.netlify.app/" target="_blank" rel="noopener noreferrer">
          <MdOutlineWeb size={40} color="#fff"></MdOutlineWeb>
        </a>
        <a href="https://twitter.com/jackapp_tmy" target="_blank" rel="noopener noreferrer">
          <BsTwitter size={36} color="#fff"></BsTwitter>
        </a>
        <a href="mailto:jack.app.tmy@gmail.com">
          <MdEmail size={36} color="#fff"></MdEmail>
        </a>
      </div>
      <div className={styles.copy}>&copy;jack 2023</div>
    </footer>
  );
}
