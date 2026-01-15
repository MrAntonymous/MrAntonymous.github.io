// Año automático en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Lightbox simple para galería
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");

document.getElementById("gallery")?.addEventListener("click", (e) => {
  const btn = e.target.closest(".thumb");
  if (!btn) return;

  const full = btn.getAttribute("data-full");
  const img = btn.querySelector("img");

  lbImg.src = full;
  lbImg.alt = img?.alt || "Foto de la finca";
  lightbox.showModal();
});

lbClose?.addEventListener("click", () => lightbox.close());
lightbox?.addEventListener("click", (e) => {
  // Cierra si haces click fuera de la imagen
  const rect = lbImg.getBoundingClientRect();
  const inside =
    e.clientX >= rect.left && e.clientX <= rect.right &&
    e.clientY >= rect.top && e.clientY <= rect.bottom;
  if (!inside) lightbox.close();
});

// Formulario: envía por mailto (sin backend)
const leadForm = document.getElementById("leadForm");
leadForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(leadForm);
  const nombre = (data.get("nombre") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const telefono = (data.get("telefono") || "").toString().trim();
  const mensaje = (data.get("mensaje") || "").toString().trim();

  const subject = encodeURIComponent(`Solicitud de dossier - ${nombre}`);
  const body = encodeURIComponent(
    `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\n\nMensaje:\n${mensaje}\n`
  );

  // Cambia el correo de destino aquí:
  const to = "contacto@tudominio.com";

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
});
