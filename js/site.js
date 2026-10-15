document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

document.querySelectorAll("[data-copy-email]").forEach((button) => {
  const email = button.getAttribute("data-copy-email");
  const note = button.querySelector("[data-copied]");
  button.addEventListener("click", async () => {
    const input = document.createElement("textarea");
    input.value = email;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.top = "0";
    input.style.left = "0";
    input.style.opacity = "0";
    document.body.append(input);
    input.focus();
    input.select();
    input.setSelectionRange(0, email.length);
    const legacy = document.execCommand("copy");
    input.remove();

    let modern = false;
    try {
      await navigator.clipboard.writeText(email);
      modern = true;
    } catch {
      modern = false;
    }

    if (!legacy && !modern) return;
    if (note) note.hidden = false;
    button.setAttribute("aria-label", "Email copied");
    window.setTimeout(() => {
      if (note) note.hidden = true;
      button.setAttribute("aria-label", "Copy email address");
    }, 1600);
  });
});
