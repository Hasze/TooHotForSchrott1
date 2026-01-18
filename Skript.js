/**
 * Seitenwechsel-Logik (SPA-Funktionalität)
 */
function showPage(pageId) {
    // Liste aller Sektionen
    const sections = ['portal-page', 'crisis-page', 'about-page'];
    
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.add('hidden');
        }
    });

    // Gewünschte Seite anzeigen
    const target = document.getElementById(pageId + '-page');
    if (target) {
        target.classList.remove('hidden');
        window.scrollTo(0,0);
    }
}

/**
 * Steuert die Anzeige der Adresseingabe
 */
function handleTypeChange() {
    const isPickup = document.getElementById('pickup').checked;
    const addressBox = document.getElementById('addressBox');
    
    if (isPickup) {
        addressBox.classList.remove('hidden');
    } else {
        addressBox.classList.add('hidden');
    }
}

/**
 * Hauptlogik der Registrierung
 */
function processRegistration() {
    // Werte auslesen
    const typeValue = document.querySelector('input[name="type"]:checked').value;
    const clothes = document.getElementById('clothes').value;
    const crisis = document.getElementById('crisis-select').value;
    const plz = document.getElementById('plz').value;
    const officePrefix = "12";

    // Validierung
    if (!clothes) {
        alert("Bitte geben Sie die Art der Kleidung an.");
        return;
    }

    if (typeValue === 'pickup') {
        if (!plz.startsWith(officePrefix)) {
            alert("Abholung nicht möglich: Unser Service ist aktuell nur für PLZ-Bereiche beginnend mit " + officePrefix + " verfügbar.");
            return;
        }
    }

    // UI-Wechsel
    document.getElementById('donationForm').parentElement.classList.add('hidden');
    document.getElementById('success-card').classList.remove('hidden');

    // Bestätigungsdaten generieren
    const now = new Date();
    const ort = (typeValue === 'office') ? "Geschäftsstelle Berlin" : "Abholung (PLZ " + plz + ")";

    document.getElementById('result-details').innerHTML = `
        <div style="line-height: 2;">
            <p><strong>Spendenart:</strong> ${clothes}</p>
            <p><strong>Zielgebiet:</strong> ${crisis}</p>
            <p><strong>Übergabeort:</strong> ${ort}</p>
            <hr style="border: 0; border-top: 1px solid #ccc; margin: 10px 0;">
            <p><strong>Registriert am:</strong> ${now.toLocaleDateString('de-DE')} um ${now.toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'})} Uhr</p>
        </div>
    `;
}
