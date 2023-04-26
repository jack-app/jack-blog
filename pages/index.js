import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "../styles/index.module.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Seo from "../components/Seo";
import createImage from "../utils/createImage";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <Seo
        pageTitle={"jack blog"}
        pageDescription={"アプリ開発団体jackのメンバーズブログ"}
        pageImg={"/home.png"}
        pageImgWidth={1200}
        pageImgHeight={600}
      />

      <Header />

      <main className={styles.container}>
        <div className={styles.main}>
          <div className={styles.posts}>
            {posts.map((post) => {
              const date = new Date(post.last_edited_time).toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              });

              let src;
              if (post.cover) {
                src =
                  post.cover.type === "external" ? post.cover.external.url : post.cover.file.url;
              }

              return (
                <Link href={`/${post.id}`} key={post.id}>
                  <div className={styles.post}>
                    {post.cover ? (
                      <img src={src} width={250} height={200} className={styles.postImage} />
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

  const posts = await Promise.all(
    database
      .filter((post) => post.properties.Publish.checkbox)
      .map(async (post) => {
        console.log(post.cover);
        if (post.cover === null) return post;
        if (post.cover.type === "file") {
          const newUrl = await createImage(post.id, "cover", post.cover.file.url);
          post.cover.file.url = newUrl;
          return post;
        }

        return post;
      })
  );

  return {
    props: {
      posts: posts,
    },
    revalidate: 1,
  };
};
