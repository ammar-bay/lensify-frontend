// pages/_app.jsx
import { useEffect, useRef } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import nProgress from "nprogress";
import { CacheProvider } from "@emotion/react";
import { appWithTranslation } from "next-i18next";


import RTL from "components/RTL";
import MuiTheme from "theme/MuiTheme";
import { AppProvider } from "contexts/AppContext";
import SettingsProvider from "contexts/SettingContext";
import SnackbarProvider from "components/SnackbarProvider";
import createEmotionCache from "createEmotionCache";

import "nprogress/nprogress.css";
import "simplebar-react/dist/simplebar.min.css";
import "../src/__server__";

// Bind NProgress to route events (optional)
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());
nProgress.configure({ showSpinner: false });

const clientSideEmotionCache = createEmotionCache();

/** ---------- Scroll Manager (works with SimpleBar) ---------- */
function ScrollManager() {
  const router = useRouter();
  const isHistoryNavRef = useRef(false); // true when navigation is via browser Back/Forward

  // Choose the actual scroller (SimpleBar if present, else document)
  const getScroller = () => {
    if (typeof document === "undefined") return null;

    // Prefer the main SimpleBar wrapper if present
    const simpleBar = document.querySelector(".simplebar-content-wrapper");
    if (simpleBar && simpleBar.scrollHeight > simpleBar.clientHeight) {
      return simpleBar;
    }

    // Fallback to the document scroller
    return document.scrollingElement || document.documentElement || document.body;
  };

  const getPos = () => {
    const scroller = getScroller();
    if (!scroller) return { x: 0, y: 0 };
    if (scroller === document.scrollingElement || scroller === document.documentElement || scroller === document.body) {
      return { x: window.scrollX, y: window.scrollY };
    }
    return { x: scroller.scrollLeft, y: scroller.scrollTop };
  };

  const setPos = (x, y) => {
    const scroller = getScroller();
    if (!scroller) return;

    // Instant jump (no smooth behavior unless you want it)
    if (scroller === document.scrollingElement || scroller === document.documentElement || scroller === document.body) {
      window.scrollTo({ left: x, top: y, behavior: "auto" });
    } else {
      scroller.scrollTo({ left: x, top: y, behavior: "auto" });
    }
  };

  const keyFor = (url) => `scroll:${url}`;

  const saveCurrent = (url) => {
    try {
      const { x, y } = getPos();
      sessionStorage.setItem(keyFor(url), JSON.stringify({ x, y }));
    } catch {}
  };

  // Try to restore with a few retries to wait for content height
  const restoreWithRetry = (url, tries = 14) => {
    const raw = sessionStorage.getItem(keyFor(url));
    if (!raw) return false;

    let { x, y } = { x: 0, y: 0 };
    try {
      ({ x, y } = JSON.parse(raw) || { x: 0, y: 0 });
    } catch {}

    const scroller = getScroller();
    if (!scroller) return false;

    const canScroll =
      (scroller === document.scrollingElement || scroller === document.documentElement || scroller === document.body)
        ? document.body.scrollHeight >= y || document.documentElement.scrollHeight >= y
        : scroller.scrollHeight >= y;

    if (canScroll || tries <= 0) {
      setPos(x, y);
      return true;
    }

    // Wait a frame and try again (up to ~250–300ms)
    requestAnimationFrame(() => restoreWithRetry(url, tries - 1));
    return false;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Ensure the browser doesn't auto-restore
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Mark history nav (Back/Forward)
    const onPopState = () => {
      isHistoryNavRef.current = true;
    };
    window.addEventListener("popstate", onPopState);

    // Save current page before leaving it
    const handleStart = (nextUrl) => {
      saveCurrent(router.asPath);
    };

    // After navigation completes, decide how to position
    const handleComplete = (destUrl) => {
      const isHome = destUrl === "/" || destUrl.startsWith("/?");
      const isHistory = isHistoryNavRef.current;

      if (isHistory) {
        // Back/Forward → restore if we have it; else top (home tries restore from its own key)
        if (!restoreWithRetry(destUrl)) {
          if (isHome) restoreWithRetry("/"); // try a generic home key as fallback
          setPos(0, 0);
        }
      } else {
        // Link click navigation:
        // - Homepage: ALWAYS restore where left (if known), else top
        // - Other pages: start from top
        if (isHome) {
          if (!restoreWithRetry(destUrl)) {
            if (!restoreWithRetry("/")) setPos(0, 0);
          }
        } else {
          setPos(0, 0);
        }
      }

      // reset the flag for subsequent navigations
      isHistoryNavRef.current = false;
    };

    const handleError = () => {
      // If a route change fails, ensure flag is reset
      isHistoryNavRef.current = false;
    };

    // Also save on reload/close
    const handleBeforeUnload = () => saveCurrent(router.asPath);
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Subscribe
    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleError);

    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleError);
    };
  }, [router]);

  return null;
}

/** ---------- App ---------- */
const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Eyewear with Care" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Lensify - Eyewear Collection</title>
      </Head>

      <SettingsProvider>
        <AppProvider>
          <MuiTheme>
            <SnackbarProvider>
              <RTL>
                <ScrollManager />
                {getLayout(<Component {...pageProps} />)}
              </RTL>
            </SnackbarProvider>
          </MuiTheme>
        </AppProvider>
      </SettingsProvider>
    </CacheProvider>
  );
};


export default appWithTranslation(App);
