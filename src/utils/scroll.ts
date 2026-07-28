export function scrollToSection(id: string) {
  setTimeout(() => {
    const element = document.getElementById(id);
    if (!element) return;
    const header = document.getElementById("main-nav-bar");
    const headerOffset = header ? header.offsetHeight : 80;
    const offsetPosition =
      element.getBoundingClientRect().top + window.scrollY - headerOffset - 16;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }, 120);
}
