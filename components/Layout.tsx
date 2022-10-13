import { PropsWithChildren, FC, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "@styles/layout.module.css";
import utilStyles from "@styles/utils.module.css";

type Props = PropsWithChildren & {
  home: boolean;
};

type Theme = "light" | "dark";

const name = "Jason Evangelista";
export const title = "NextJS Sample Website";

const Layout: FC<Props> = (props) => {
  const { children, home } = props;
  const [theme, setTheme] = useState(true);

  const handleThemeToggle = () => setTheme(!theme);

  useEffect(() => {
    const dataTheme = document.body.dataset.theme as Theme;
    if (dataTheme === "light") {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
    }
  }, [theme]);

  return (
    <div className={styles.container}>
      <ToastContainer />
      <button className="toggleThemeButton" onClick={handleThemeToggle}>
        Theme
      </button>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            title
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={170}
              width={144}
              alt=""
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={150}
                  width={124}
                  alt=""
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingXl}>{name}</h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
