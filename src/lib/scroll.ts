// Smooth scrolling is handled in CSS, which also respects reduced-motion settings.
export function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView();
}
