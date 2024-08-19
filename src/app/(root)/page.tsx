import { Toaster } from "react-hot-toast";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import RootNavbar from "./_RootComponents/RootNavbar";
import Header from "./_RootComponents/Header";
import FeaturesSection from "./_RootComponents/Content";
import Footer from "./_RootComponents/Footer";

export default async function Home() {
  return (
    <main>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <div className="h-[80px] w-full flex fixed inset-y-0 z-40 bg-white">
        <RootNavbar />
      </div>
      <Header />
      <FeaturesSection />
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
      <ConfettiProvider />
    </main>
  );
}
