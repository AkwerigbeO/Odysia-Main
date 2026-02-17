/**
 * Escapes HTML special characters to prevent HTML injection.
 * Use when interpolating untrusted strings directly into an HTML template.
 *
 * @param {string} str - The untrusted string
 * @returns {string} - The escaped string safe for HTML insertion
 */
const escapeHtml = (str) => {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
};

module.exports = { escapeHtml };
