/**
 * Navigation zwischen den Seiten
 */
function showPage(pageId) {
    // Alle Seiten verstecken
    document.getElementById('portal-page').classList.add('hidden');
    document.getElementById('crisis-page').classList.add('hidden');
    document.getElementById('about-page').classList.add('hidden');
    
    // Gewünschte Seite anzeigen
    document.getElementById(pageId + '-page').classList.remove('hidden');
}

/**
 * Zeigt/Versteckt Adressfeld basierend auf Radio-Button
 */
function handleTypeChange() {
    const isPickup = document.getElementById('type-pickup').checked;
    const addressBox = document.getElementById('addressBox');
    
    if (isPickup) {
        addressBox.classList.remove('hidden');
    } else {
        addressBox.classList.add('hidden');
    }
}

/**
 * Validierung und Verarbeitung (Anforderung h & i)
 */
function processRegistration() {
    const type = document.querySelector('input[name="type"]:checked').value;
    const clothes = document.getElementById('clothes').value;
    const crisis = document.getElementById('crisis-select').value;
    const plz = document.getElementById('plz').value;
    const officePrefix = "12"; // Vorgabe

    // 1. Pflichtfeldprüfung
    if (!clothes) {
        alert("Bitte geben Sie an, was Sie spenden möchten.");
        return;
    }

    // 2. PLZ Logik für Abholung (Anforderung h)
    if (type === 'pickup') {
        if (!plz.startsWith(officePrefix)) {
            alert("Abholung leider nicht möglich. Die PLZ muss mit " + officePrefix + " beginnen.");
            return;
        }
    }

    // 3. Erfolg anzeigen (Anforderung i)
    document.getElementById('form-card').classList.add('hidden');
    document.getElementById('success-card').classList.remove('hidden');

    const now = new Date();
    const ort = (type === 'office') ? "Geschäftsstelle Berlin" : "Abholung von: " + plz;

    document.getElementById('result-details').innerHTML = `
        <p><strong>Kleidung:</strong> ${clothes}</p>
        <p><strong>Region:</strong> ${crisis}</p>
        <p><strong>Ort:</strong> ${ort}</p>
        <p><strong>Datum:</strong> ${now.toLocaleDateString('de-DE')}</p>
        <p><strong>Zeit:</strong> ${now.toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'})} Uhr</p>
    `;
}