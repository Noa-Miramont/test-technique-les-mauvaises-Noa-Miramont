// Fichier de test //

const https = require('https');

const DEPLOYMENT_URL = 'https://test-technique-les-mauvaises.vercel.app';

const images = [
  '/backgrounds/ArteBG.png',
  '/backgrounds/FloaBG.png',
  '/backgrounds/GalerieBG.png',
  '/backgrounds/LesMauvaiseBG.png',
  '/backgrounds/SharpAndCheesyBG.png',
  '/backgrounds/SoapNovaBG.png',
  '/backgrounds/VDKBG.png'
];

function testImage(imagePath) {
  return new Promise((resolve) => {
    const url = `${DEPLOYMENT_URL}${imagePath}`;
    
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      resolve({
        path: imagePath,
        status: res.statusCode,
        accessible: res.statusCode === 200,
        url
      });
    });

    req.on('error', (err) => {
      resolve({
        path: imagePath,
        status: 'ERROR',
        accessible: false,
        error: err.message,
        url
      });
    });

    req.end();
  });
}

async function checkDeployment() {
  console.log('Checking deployment on Vercel...\n');
  
  for (const image of images) {
    const result = await testImage(image);
    console.log(`${result.accessible ? 'yes' : 'no'} ${result.path} - Status: ${result.status}`);
    if (!result.accessible) {
      console.log(`   URL: ${result.url}`);
    }
  }
  
  console.log('\nDeployment check completed!');
}

checkDeployment(); 