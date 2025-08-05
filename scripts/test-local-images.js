// Fichier de test //

const http = require('http');

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
    const options = {
      hostname: 'localhost',
      port: 3002,
      path: imagePath,
      method: 'HEAD'
    };

    const req = http.request(options, (res) => {
      resolve({
        path: imagePath,
        status: res.statusCode,
        accessible: res.statusCode === 200
      });
    });

    req.on('error', (err) => {
      resolve({
        path: imagePath,
        status: 'ERROR',
        accessible: false,
        error: err.message
      });
    });

    req.end();
  });
}

async function testAllImages() {
  console.log('Testing background images on localhost:3002...\n');
  
  for (const image of images) {
    const result = await testImage(image);
    console.log(`${result.accessible ? 'yes' : 'no'} ${result.path} - Status: ${result.status}`);
    if (!result.accessible && result.error) {
      console.log(`   Error: ${result.error}`);
    }
  }
  
  console.log('\nTest completed!');
}

testAllImages(); 