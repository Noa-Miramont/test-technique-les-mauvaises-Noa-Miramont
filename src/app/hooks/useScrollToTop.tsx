'use client';

import {useGSAP} from '@gsap/react';
import {usePathname} from 'next/navigation';
import gsap from 'gsap';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function useScrollToTop () {
  const pathname = usePathname();

  useGSAP(() => {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: 0,
      ease: 'power2.inOut',
    });
  }, {dependencies: [pathname]});
}
