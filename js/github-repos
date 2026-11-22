(async function () {
    const USERNAME = "GiuseppeB-portfolio";
    const TOPIC = "portfolio";
    const ESCLUDI = ["Portfolio-Giuseppe-Bianco"];

    const sezione = document.getElementById("nuovi-progetti");
    const lista = document.getElementById("lista-progetti");
    if (!sezione || !lista) return;

    // Link già presenti nelle card scritte a mano
    const giaPresenti = new Set(
        [...document.querySelectorAll(".project-link")].map((a) =>
            a.href.toLowerCase().replace(/\/$/, "")
        )
    );

    try {
        const res = await fetch(
            `https://api.github.com/users/${USERNAME}/repos?sort=created&direction=desc&per_page=100`
        );
        if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
        const repos = await res.json();

        const nuove = repos.filter(
            (r) =>
                !r.fork &&
                !ESCLUDI.includes(r.name) &&
                (r.topics || []).includes(TOPIC) &&
                !giaPresenti.has(r.html_url.toLowerCase())
        );

        if (nuove.length === 0) return;

        nuove.forEach((r) => {
            const card = document.createElement("article");
            card.className = "project-card";

            const titolo = document.createElement("h3");
            titolo.textContent = r.name.replace(/[-_]/g, " ");

            const tags = document.createElement("ul");
            tags.className = "project-tags";
            [r.language, ...(r.topics || []).filter((t) => t !== TOPIC)]
                .filter(Boolean)
                .forEach((t) => {
                    const li = document.createElement("li");
                    li.textContent = t;
                    tags.appendChild(li);
                });

            const desc = document.createElement("p");
            desc.textContent = r.description || "";

            const link = document.createElement("a");
            link.className = "project-link";
            link.href = r.html_url;
            link.target = "_blank";
            link.rel = "noopener";
            link.textContent = "Vedi il repository →";

            card.append(titolo, tags, desc, link);
            lista.appendChild(card);
        });

        sezione.hidden = false;
    } catch (e) {
        console.error(e);
    }
})();
