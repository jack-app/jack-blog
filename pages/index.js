import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import Image from "next/image";
import styles from "./index.module.css";
import { MdOutlineWeb } from "react-icons/md";
import { BsTwitter } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { Header } from "../components/Header";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>jack blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <Header></Header>
        <div className={styles.main}>
          <div className={styles.posts}>
            {posts
              .filter((post) => post.properties.Publish.checkbox)
              .map((post) => {
                console.log(post);
                const date = new Date(post.last_edited_time).toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                });
                return (
                  <div className={styles.post}>
                    <Link href={`/${post.id}`} key={post.id}>
                      <Image src={post.cover.external.url} width={250} height={200}></Image>
                      <div className={styles.details}>
                        <div className={styles.postTitle}>
                          <Text text={post.properties.Name.title} />
                        </div>
                        <p className={styles.postDescription}>{date}</p>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>

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
