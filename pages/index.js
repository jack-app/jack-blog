import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
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

      <Header />

      <main className={styles.container}>
        <div className={styles.main}>
          <div className={styles.posts}>
            {posts
              .filter((post) => post.properties.Publish.checkbox)
              .map((post) => {
                const date = new Date(post.last_edited_time).toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                });
                return (
                  <Link href={`/${post.id}`} key={post.id}>
                    <div className={styles.post}>
                      {post.cover ? (
                        <img
                          src={post.cover.external.url}
                          width={250}
                          height={200}
                          className={styles.postImage}
                        />
                      ) : (
                        <div className={styles.defaultImage}>
                          <img src="/OrangeLogo.png" width={200} height={160} />
                        </div>
                      )}
                      <div className={styles.details}>
                        <div className={styles.postTitle}>
                          <Text text={post.properties.Name.title} />
                        </div>
                        <p className={styles.postDescription}>{date}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </main>

      <Footer />
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
