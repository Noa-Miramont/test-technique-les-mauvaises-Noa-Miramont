import "./styles/globals.scss";
import { Loader } from "@/components/UI/Loader";
import { PreloadBackgrounds } from "@/components/UI/PreloadBackgrounds";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Loader />
        <PreloadBackgrounds />
        {children}
      </body>
    </html>
  );
}