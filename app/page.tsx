import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Services from '@/components/Services';
import Trust from '@/components/Trust';
import AppDownload from '@/components/AppDownload';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <Services />
      <Trust />
      <AppDownload />
    </main>
  );
}
