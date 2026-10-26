import { USAGE_SYNC_AGENTS } from "@/lib/coding-agents";
import { AgentLogoStrip } from "./components/AgentLogoStrip";
import { Btn } from "./components/Btn";
import { FeatureBlock } from "./components/FeatureBlock";
import { ProductCut } from "./components/ProductCut";
import { UiShowcase } from "./components/UiShowcase";
import { Wordmark } from "./components/Wordmark";
import { productShots } from "./lib/media-shots";
import styles from "./landing.module.css";
import featureStyles from "./components/feature-block.module.css";

const APP = "https://agentrnk.xyz";
const DEMO_PROFILE = "cursor";

export function LandingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerBar}>
          <a href="/" className={styles.logoLink} aria-label="Agentrnk home">
            <Wordmark />
          </a>
          <div className={styles.headerCta}>
            <Btn variant="ghost" size="sm" href={`${APP}/auth`}>
              Sign in
            </Btn>
            <Btn variant="download" size="sm" href={`${APP}/auth`}>
              Get started
            </Btn>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <h1 className={styles.heroTitle}>
              Agentrnk is your profile for building with coding agents.
            </h1>
            <p className={styles.heroLead}>
              Sync usage from Cursor, Claude Code, and the rest into one public handle—charts,
              rank, and the same dashboard you sign into.
            </p>
            <div className={styles.heroActions}>
              <Btn variant="hero" href={`${APP}/auth`}>
                Get started
                <span aria-hidden> →</span>
              </Btn>
            </div>
            <AgentLogoStrip />
          </div>

          <UiShowcase />
        </section>

        <section className={styles.trust}>
          <div className={styles.sectionInner}>
            <h2 className={styles.trustTitle}>
              Trusted by builders syncing {USAGE_SYNC_AGENTS.length} coding agents
            </h2>
            <AgentLogoStrip />
          </div>
        </section>

        <section className={styles.bento}>
          <div className={styles.sectionInner}>
            <h2 className={styles.bentoTitle}>The same UI you use every day</h2>
            <p className={styles.bentoLead}>
              Real product surfaces from agentrnk.xyz—profile stats, usage charts, and focus heatmaps.
            </p>
            <div className={styles.bentoGrid}>
              <ProductCut
                className={styles.bentoTile}
                src={productShots.profileHeader.src}
                alt={productShots.profileHeader.alt}
              />
              <ProductCut
                className={styles.bentoTile}
                src={productShots.profileUsage.src}
                alt={productShots.profileUsage.alt}
              />
              <ProductCut
                className={[styles.bentoTile, styles.bentoWide].join(" ")}
                src={productShots.profileFocus.src}
                alt={productShots.profileFocus.alt}
              />
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.sectionInner}>
            <FeatureBlock
              title="Your public profile, with real usage"
              body="Charts, heatmaps, focus time, and agent breakdown—the same profile you share as @handle."
              href={`${APP}/${DEMO_PROFILE}`}
              linkLabel="See a profile"
              mediaSrc={productShots.profileUsage.src}
              mediaAlt={productShots.profileUsage.alt}
              mediaFrameClass={featureStyles.mediaClose}
            />
            <FeatureBlock
              reverse
              title="Leaderboard and leagues"
              body="See where you rank by tokens, streak, and league tier on the live board."
              href={`${APP}/leaderboard`}
              linkLabel="Open leaderboard"
              mediaSrc={productShots.leaderboardTable.src}
              mediaAlt={productShots.leaderboardTable.alt}
              mediaFrameClass={featureStyles.mediaClose}
            />
            <FeatureBlock
              title="One CLI, every agent"
              body="Install after sign-in. The agentrnk CLI reads local logs from Cursor, Codex, Claude Code, and the rest—then publishes to your profile."
              href="https://www.npmjs.com/package/agentrnk"
              linkLabel="View on npm"
              mediaSrc={productShots.profileAgents.src}
              mediaAlt={productShots.profileAgents.alt}
              mediaFrameClass={featureStyles.mediaClose}
            />
          </div>
        </section>

        <section className={styles.bottomCta}>
          <div className={styles.sectionInner}>
            <h2 className={styles.bottomTitle}>Try Agentrnk now.</h2>
            <Btn variant="hero" href={`${APP}/auth`}>
              Get started
              <span aria-hidden> →</span>
            </Btn>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.sectionInner}>
            <Wordmark />
            <div className={styles.footerLinks}>
              <a href={APP}>App</a>
              <a href={`${APP}/premium`}>Premium</a>
              <a href="https://www.npmjs.com/package/agentrnk">npm</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
