import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import Image from "next/image";
import styles from "./index.module.css";
import { MdOutlineWeb } from "react-icons/md";
import { BsTwitter } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>jack blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titles}>
            <div className={styles.mainTitle}>jack blog</div>
            <div className={styles.subTitle}>アプリ開発団体jack メンバーズブログ</div>
          </div>
          <div className={styles.overlay}></div>
          <Image src="/HeaderBackground.png" fill></Image>
        </header>

        <h2 className={styles.heading}>All Posts</h2>
        <ol className={styles.posts}>
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            });
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <Text text={post.properties.Name.title} />
                  </Link>
                </h3>

                <p className={styles.postDescription}>{date}</p>
                <Link href={`/${post.id}`}>Read post →</Link>
              </li>
            );
          })}
        </ol>

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
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
