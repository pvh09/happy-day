import { useEffect, useState } from "react";
import {
  CalendarDays,
  Heart,
  MapPin,
  Menu,
  X,
  ArrowDown,
  Gift,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { weddingData as w } from "./weddingData";

const links = [
  ["#story", "Hành trình yêu thương"],
  ["#events", "Lịch cưới"],
  ["#rsvp", "Xác nhận tham dự"],
  ["#gallery", "Album ảnh"],
] as const;
const Botanical = ({ className = "" }: { className?: string }) => (
  <img
    className={`botanical ${className}`}
    src="/artwork/botanical.svg"
    alt=""
    aria-hidden="true"
  />
);
const HeartOrnament = () => (
  <img
    className="heart-art"
    src="/artwork/heart.svg"
    alt=""
    aria-hidden="true"
  />
);
const SectionTitle = ({
  children,
}: {
  eyebrow?: string;
  children: React.ReactNode;
}) => (
  <div className="section-heading" data-reveal>
    <span className="heading-sprig" />
    <h2>{children}</h2>
    <span className="heading-sprig" />
  </div>
);

export default function App() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [navOpen, setNavOpen] = useState(false);
  const [photo, setPhoto] = useState<number | null>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const closeNav = () => setNavOpen(false);
  const openInvitation = () => {
    if (opening || opened) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    setOpening(true);
  };
  useEffect(() => {
    if (!opening) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timer = window.setTimeout(() => setOpened(true), reduced ? 0 : 1100);
    return () => window.clearTimeout(timer);
  }, [opening]);
  useEffect(() => {
    if (!opened) return;
    document
      .querySelector<HTMLAnchorElement>(".brand")
      ?.focus({ preventScroll: true });
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            reveal.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      el.classList.add("reveal-ready");
      reveal.observe(el);
    });
    const sections = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-10% 0px -60% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((el) => sections.observe(el));
    return () => {
      reveal.disconnect();
      sections.disconnect();
    };
  }, [opened]);
  useEffect(() => {
    const locked = !opened || photo !== null || rsvpOpen || giftOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPhoto(null);
        setRsvpOpen(false);
        setGiftOpen(false);
        setNavOpen(false);
      }
      if (photo !== null && e.key === "ArrowRight")
        setPhoto((photo + 1) % w.gallery.length);
      if (photo !== null && e.key === "ArrowLeft")
        setPhoto((photo + w.gallery.length - 1) % w.gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [opened, photo, rsvpOpen, giftOpen]);
  return (
    <>
      {!opened && (
        <div
          className={`opening${opening ? " is-opening" : ""}`}
          aria-label="Màn mở thiệp"
          aria-busy={opening}
        >
          <div className="invitation-card">
            <img
              className="invitation-art"
              src="/artwork/invitation.webp"
              alt="Phong bì giấy hồng pastel với dấu sáp rose-gold và hoa trang trí"
            />
            <div className="opening-names">
              <h1>
                {w.couple.groom}
                <span>&amp;</span>
                {w.couple.bride}
              </h1>
              <div className="name-divider">
                <HeartOrnament />
              </div>
              {w.date && <p className="wedding-date">{w.date}</p>}
            </div>
            <button
              className="envelope-hit"
              onClick={openInvitation}
              disabled={opening}
              aria-label="Chạm để mở thiệp"
            />
            <button
              className="open-action"
              onClick={openInvitation}
              disabled={opening}
            >
              <span className="open-heart">
                <Heart size={15} strokeWidth={1} />
              </span>
              Chạm để mở thiệp
            </button>
          </div>
        </div>
      )}

      <div
        className={`site-shell${opening ? " site-entering" : ""}`}
        inert={!opened}
      >
        <header className="site-header">
          <a className="brand" href="#home" onClick={closeNav}>
            <img src="/artwork/botanical.svg" alt="Long Vũ và Thanh Thuý" />
          </a>
          <nav className={navOpen ? "nav open" : "nav"} aria-label="Menu chính">
            {links.map(([href, name]) => (
              <a
                href={href}
                key={href}
                onClick={closeNav}
                aria-current={activeSection === href ? "location" : undefined}
              >
                {name}
              </a>
            ))}
          </nav>
          <button
            className="icon-button mobile-menu"
            aria-label={navOpen ? "Đóng menu" : "Mở menu"}
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? <X /> : <Menu />}
          </button>
          <Heart className="header-heart" size={19} />
        </header>
        <main>
          <section id="home" className="hero">
            <div className="hero-photo" />
            <div className="hero-shade" />
            <Botanical className="hero-botanical" />
            <div className="hero-copy">
              <h1>
                {w.couple.groom} <span>&</span>
                <br />
                {w.couple.bride}
              </h1>
              <div className="name-divider">
                <HeartOrnament />
              </div>
              {w.date && <p className="wedding-date">{w.date}</p>}
              <p className="hero-invitation">
                Hạnh phúc khi có bạn cùng chung vui
              </p>
              <a href="#story" className="scroll-hint">
                Khám phá câu chuyện của chúng mình <ArrowDown size={16} />
              </a>
            </div>
          </section>
          <section id="story" className="story-section content-section">
            <Botanical className="story-left" />
            <Botanical className="story-right" />
            <SectionTitle eyebrow="OUR LOVE STORY">
              Hành trình yêu thương
            </SectionTitle>
            <p className="section-intro">{w.storyIntro}</p>
            <div className="journey">
              <svg
                className="journey-path journey-desktop"
                viewBox="0 0 1000 250"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M50 120 C180 -30 230 260 350 115 S540 25 600 125 S800 250 950 80" />
                {[
                  [230, 155],
                  [445, 45],
                  [680, 180],
                  [860, 150],
                ].map(([x, y]) => (
                  <image
                    key={x}
                    href="/artwork/heart.svg"
                    x={x}
                    y={y}
                    width="18"
                    height="18"
                  />
                ))}
              </svg>
              <svg
                className="journey-path journey-mobile"
                viewBox="0 0 100 1000"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M50 0 C95 65 95 135 50 200 S5 335 50 400 S95 535 50 600 S5 735 50 800 S95 935 50 1000" />
                {[170, 370, 570, 770].map((y) => (
                  <image
                    key={y}
                    href="/artwork/heart.svg"
                    x="43"
                    y={y}
                    width="15"
                    height="15"
                  />
                ))}
              </svg>
              {w.milestones.map((m, i) => (
                <article
                  className="milestone"
                  key={m.title}
                  data-reveal
                  style={{ transitionDelay: `${i * 65}ms` }}
                >
                  <div className="photo-frame">
                    <img src={m.image} alt={m.title} loading="lazy" />
                  </div>
                  <div className="milestone-copy">
                    <span className="milestone-date">{m.date}</span>
                    <h3>{m.title}</h3>
                    <p>{m.description}</p>
                  </div>
                  <span className="milestone-index">0{i + 1}</span>
                </article>
              ))}
            </div>
          </section>
          <section id="events" className="events-section content-section">
            <SectionTitle eyebrow="SAVE THE DATE">
              Thông tin lễ cưới
            </SectionTitle>
            <p className="section-intro">{w.invitation}</p>
            <div className="event-grid">
              <div className="event-group" data-reveal>
                <CalendarDays />
                <h3>Lịch cưới</h3>
                {w.events.map((e) => (
                  <div className="event-entry" key={e.title}>
                    <h4>{e.title}</h4>
                    <p>{e.time}</p>
                  </div>
                ))}
              </div>
              <div className="event-group" data-reveal>
                <MapPin />
                <h3>Địa điểm tổ chức</h3>
                {w.events.map((e) => (
                  <div className="event-entry" key={e.title}>
                    <h4>{e.title}</h4>
                    <p>{e.venue}</p>
                    {e.address && <p>{e.address}</p>}
                    {e.mapUrl ? (
                      <a
                        className="text-link"
                        href={e.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Xem bản đồ
                      </a>
                    ) : (
                      <span className="event-unavailable">
                        Bản đồ sẽ bổ sung sau
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="event-group" data-reveal>
                <Gift />
                <h3>Tiệc mừng sum vầy</h3>
                <p>{w.invitation}</p>
                <button className="text-link" onClick={() => setGiftOpen(true)}>
                  Thông tin mừng cưới
                </button>
              </div>
            </div>
          </section>
          <section id="rsvp" className="rsvp-section content-section">
            <Botanical className="corner-left" />
            <Botanical className="corner-right" />
            <SectionTitle eyebrow="KINDLY REPLY">Xác nhận tham dự</SectionTitle>
            <p>Niềm vui sẽ trọn vẹn hơn khi có sự hiện diện của bạn.</p>
            <button
              className="primary-button"
              onClick={() => setRsvpOpen(true)}
            >
              XÁC NHẬN THAM DỰ
            </button>
          </section>
          <section id="gallery" className="gallery-section content-section">
            <SectionTitle eyebrow="OUR MEMORIES">Album ảnh cưới</SectionTitle>
            <p className="section-intro">
              Những khoảnh khắc dịu dàng mà chúng mình muốn lưu giữ mãi.
            </p>
            <div className="gallery-grid">
              {w.gallery.map((src, i) => (
                <button
                  className="gallery-item"
                  data-reveal
                  key={src}
                  onClick={() => setPhoto(i)}
                  aria-label={`Xem ảnh cưới ${i + 1}`}
                >
                  <img src={src} loading="lazy" alt={`Ảnh cưới ${i + 1}`} />
                </button>
              ))}
            </div>
          </section>
          <section className="closing-section content-section">
            <Mail size={30} strokeWidth={1.2} />
            <SectionTitle>Lời cảm ơn</SectionTitle>
            <p>
              Cảm ơn bạn đã luôn yêu thương, đồng hành và dành những lời chúc
              tốt đẹp cho chúng mình.
            </p>
            <button
              className="outline-button"
              onClick={() => setGiftOpen(true)}
            >
              <Gift size={16} /> Thông tin mừng cưới
            </button>
            <p className="closing-name">
              {w.couple.groom} & {w.couple.bride}
            </p>
          </section>
        </main>
        <footer>Long Vũ &amp; Thanh Thuý · Wedding Website V2</footer>
      </div>
      {photo !== null && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh cưới"
          onClick={() => setPhoto(null)}
        >
          <button
            className="modal-close"
            onClick={() => setPhoto(null)}
            aria-label="Đóng ảnh"
          >
            <X />
          </button>
          <button
            className="photo-nav photo-prev"
            onClick={(e) => {
              e.stopPropagation();
              setPhoto((photo + w.gallery.length - 1) % w.gallery.length);
            }}
            aria-label="Ảnh trước"
          >
            <ChevronLeft />
          </button>
          <img
            key={photo}
            className="modal-photo"
            src={w.gallery[photo]}
            alt={`Ảnh cưới ${photo + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="photo-nav photo-next"
            onClick={(e) => {
              e.stopPropagation();
              setPhoto((photo + 1) % w.gallery.length);
            }}
            aria-label="Ảnh sau"
          >
            <ChevronRight />
          </button>
          <span className="photo-counter">
            {photo + 1} / {w.gallery.length}
          </span>
        </div>
      )}
      {rsvpOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rsvp-title"
          onClick={() => setRsvpOpen(false)}
        >
          <div className="info-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="info-close"
              onClick={() => setRsvpOpen(false)}
              aria-label="Đóng"
            >
              <X size={20} />
            </button>
            <Heart color="#c9818e" />
            <h2 id="rsvp-title">Xác nhận tham dự</h2>
            <p>
              Giao diện đã sẵn sàng. Tính năng gửi và lưu xác nhận sẽ được kết
              nối trong Phase 4.
            </p>
            <span className="phase-tag">CHƯA KÍCH HOẠT LƯU DỮ LIỆU</span>
          </div>
        </div>
      )}
      {giftOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gift-title"
          onClick={() => setGiftOpen(false)}
        >
          <div className="info-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="info-close"
              onClick={() => setGiftOpen(false)}
              aria-label="Đóng"
            >
              <X size={20} />
            </button>
            <Gift color="#c9818e" />
            <h2 id="gift-title">Mừng cưới</h2>
            <p>
              Thông tin tài khoản và mã QR chưa được cung cấp nên đang để trống.
            </p>
            <span className="phase-tag">CHỜ NỘI DUNG CHÍNH THỨC</span>
          </div>
        </div>
      )}
    </>
  );
}
