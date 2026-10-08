/**
 * Footer — minimal branded footer.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          <span className="footer__brand">DEVBOARD.</span>
          <p className="footer__copy">
            &copy; {year} DEVBOARD — A developer event discovery platform.
          </p>
        </div>
      </div>
    </footer>
  );
}
