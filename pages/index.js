import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import Image from "next/image";
import styles from "./index.module.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

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

        <Footer></Footer>
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
