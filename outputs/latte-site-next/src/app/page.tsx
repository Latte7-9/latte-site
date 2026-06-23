import Hero from "@/components/hero";
import About from "@/components/about";
import WaveDivider from "@/components/wave-divider";
import BlogPreview from "@/components/blog-preview";
import Interests from "@/components/interests";
import RandomListen from "@/components/random-listen";
import Currently from "@/components/currently";
import Guestbook from "@/components/guestbook";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      
      <About />
      <WaveDivider />
      
      <BlogPreview />
      <WaveDivider flip />
      
      <Interests />
      <WaveDivider />
      
      <RandomListen />
      <WaveDivider flip />
      
      <Currently />
      <WaveDivider color="text-espresso-ink/20" />
      
      <Guestbook />
      <WaveDivider flip color="text-[#e8e0d6]" />
      
      <Contact />
      <Footer />
    </main>
  );
}