// Bouton pour changer de canette //

import { useEffect } from 'react';

function Navbar() {

  useEffect(() => {
    const checkIndex = () => {
      // @ts-ignore
      if (window.navigateSlides && window.navigateSlides.getCurrentIndex) {
        // @ts-ignore
      }
    };

    // Vérifier périodiquement l'index actuel
    const interval = setInterval(checkIndex, 100);
    return () => clearInterval(interval);
  }, []);

  const handlePrevSlide = () => {
    // @ts-ignore
    if (window.navigateSlides) {
      // @ts-ignore
      window.navigateSlides.prevSlide();
    }
  };

  const handleNextSlide = () => {
    // @ts-ignore
    if (window.navigateSlides) {
      // @ts-ignore
      window.navigateSlides.nextSlide();
    }
  };

  return (
    <nav className="navbar">

      <button className="button" onClick={handlePrevSlide}>
        <img src="/icons/Previous.svg" alt="Previous" />
      </button>

      <button className="button" onClick={handleNextSlide}>
          <img src="/icons/Next.svg" alt="Next" />
      </button>

    </nav>
  );
}

export default Navbar;