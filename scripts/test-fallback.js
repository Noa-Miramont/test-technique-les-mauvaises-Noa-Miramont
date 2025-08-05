// Fichier de test //

const fs = require('fs');
const path = require('path');

// Chemin vers le fichier projectMapping.ts
const projectMappingPath = path.join(__dirname, '../src/lib/projectMapping.ts');

// Sauvegarder le contenu original
const originalContent = fs.readFileSync(projectMappingPath, 'utf8');

// Créer une version avec des images inexistantes pour tester le fallback
const testContent = originalContent.replace(
  /\/backgrounds\/FloaBG\.png/g,
  '/backgrounds/FloaBG-TEST.png'
).replace(
  /\/backgrounds\/GalerieBG\.png/g,
  '/backgrounds/GalerieBG-TEST.png'
).replace(
  /\/backgrounds\/LesMauvaiseBG\.png/g,
  '/backgrounds/LesMauvaiseBG-TEST.png'
);

console.log('Testing fallback functionality...');
console.log('Modified image paths to test error handling...\n');

// Écrire le contenu de test
fs.writeFileSync(projectMappingPath, testContent);

console.log('Modified projectMapping.ts with test paths');
console.log('Check your browser at http://localhost:3002');
console.log('Look for console errors about failed image loading');
console.log('Verify that fallback background color is applied');
console.log('\nPress Ctrl+C to restore original paths...');

// Restaurer le contenu original quand le script est interrompu
process.on('SIGINT', () => {
  fs.writeFileSync(projectMappingPath, originalContent);
  console.log('\n Restored original image paths');
  process.exit(0);
});

// Restaurer automatiquement après 30 secondes
setTimeout(() => {
  fs.writeFileSync(projectMappingPath, originalContent);
  console.log('\nRestored original image paths (timeout)');
  process.exit(0);
}, 30000); 