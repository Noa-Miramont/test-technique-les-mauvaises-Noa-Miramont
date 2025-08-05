import "./styles/globals.scss";
import { Loader } from "@/components/UI/Loader";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Loader />
        {children}
      </body>
    </html>
  );
}