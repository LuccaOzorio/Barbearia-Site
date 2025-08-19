/* Pequena camada de UX: menu mobile, ano automático e criação dos links do WhatsApp */
(function () {
    // Atualiza o ano no rodapé
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Menu mobile
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.getElementById("nav-menu");
    if (toggle && menu) {
        toggle.addEventListener("click", () => {
            const open = menu.classList.toggle("open");
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
        });
    }

    // Helper: gera link do WhatsApp com mensagem específica
    const buildWa = (service = "Atendimento") => {
        const phone = (window.WHATSAPP_PHONE || "").replace(/\D/g, "");
        const text = encodeURIComponent(`${window.WHATSAPP_PREFIX || ""}${service}`);
        if (!phone) return "#";
        return `${window.WHATSAPP_BASE || "https://wa.me/"}${phone}?text=${text}`;
    };

    // Aplica nos CTAs principais
    const ctaIds = ["cta-corte", "cta-protese", "cta-contato", "cta-nav"];
    ctaIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const service = el.dataset.service || "Atendimento";
        el.href = buildWa(service);
    });

    // Botões das cards
    document.querySelectorAll("[data-service]").forEach(btn => {
        if (btn.id) return; // já tratado acima
        const service = btn.getAttribute("data-service") || "Atendimento";
        btn.setAttribute("href", buildWa(service));
    });

    // Smooth scroll leve (apenas para âncoras internas)
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener("click", e => {
            const target = document.querySelector(a.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                // fecha menu mobile
                menu?.classList.remove("open");
                toggle?.setAttribute("aria-expanded", "false");
            }
        });
    });
})();
