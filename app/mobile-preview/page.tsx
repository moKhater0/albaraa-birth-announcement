export const metadata = {
  title: "معاينة الهاتف | بشارة البراء",
};

export default function MobilePreviewPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "28px", background: "#dce9e5" }}>
      <section aria-label="معاينة الموقع على هاتف بعرض 390 بكسل" style={{ width: "min(390px, 100%)" }}>
        <p style={{ margin: "0 0 12px", textAlign: "center", color: "#344A45", fontWeight: 700 }}>معاينة الهاتف · 390px</p>
        <div style={{ overflow: "hidden", height: "min(844px, calc(100vh - 92px))", border: "10px solid #344A45", borderRadius: "42px", background: "#CDEAF4", boxShadow: "0 24px 70px rgba(52,74,69,.24)" }}>
          <iframe src="/" title="نسخة الهاتف من بشارة ميلاد البراء" style={{ width: "100%", height: "100%", border: 0, background: "#CDEAF4" }} />
        </div>
      </section>
    </main>
  );
}
