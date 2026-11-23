
import DiscoverSection from '../DiscoverSection';
import ConsultationHub from '../ConsultationHub';
import MentorMarketplace from '../MentorMarketplace';
import ScrollEffects from '../ScrollEffects';
import PublicTrustCommunity from '../PublicTrustCommunity';

export default function Home() {
  return (
    <main className="site-shell">
      <ScrollEffects />

      <header className="nav container">
        <a href="#top" className="brand">
          <span className="brandmark">A</span>AventIQ
        </a>
        <nav className="navlinks">
          <a href="#discover">Opportunities</a>
          <a href="#mentors">Mentors</a>
          <a href="#public-world">Community</a>
          <a href="#consultations">Consultations</a>
        </nav>
        <div className="nav-actions">
          <a href="/auth" className="nav-signin">Sign in</a>
          <a href="/profile" className="nav-signin">Profile</a>
          <a href="/notifications" className="nav-signin">Updates</a>
          <a href="#discover" className="nav-cta">Explore AventIQ ↗</a>
        </div>
      </header>

      <section id="top" className="hero container">
        <div className="hero-copy reveal">
          <div className="eyebrow">
            <span className="dot" /> A clearer path to what comes next
          </div>
          <h1>Make your next move <em>count.</em></h1>
          <p className="hero-lede">
            Discover meaningful opportunities. Learn from people who have been there.
            Build momentum with a community that thinks beyond borders.
          </p>
          <div className="hero-actions">
            <a href="#discover" className="primary">Explore opportunities ↗</a>
            <a href="#mentors" className="secondary">Meet the mentor network</a>
          </div>
        </div>
      </section>

      <section className="intro-band reveal">
        <div className="container intro-grid">
          <p className="eyebrow">THE AVENTIQ APPROACH</p>
          <h2>Ambition is everywhere.<br /><em>Access should be, too.</em></h2>
          <p>
            AventIQ brings opportunity discovery, mentorship and community
            into one considered experience.
          </p>
        </div>
      </section>

      <div className="section-intro container reveal" id="discover">
        <div>
          <p className="eyebrow">THE OPPORTUNITY LANDSCAPE</p>
          <h2>Find something worth<br /><em>your next step.</em></h2>
        </div>
        <p>Explore opportunities and confirm all details with official providers.</p>
      </div>

      <DiscoverSection />
      <MentorMarketplace />
      <ConsultationHub />
      <PublicTrustCommunity />

      <footer>
        <div className="container footer-inner">
          <a href="#top" className="brand">
            <span className="brandmark">A</span>AventIQ
          </a>
          <p>Discover with intention. Connect with care. Grow without borders.</p>
          <small>© {new Date().getFullYear()} AventIQ</small>
        </div>
      </footer>
    </main>
  );
}
