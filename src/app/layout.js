import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Zuuuuca - Controle de Estoque",
  description: "Sistema de gerenciamento de estoque e pedidos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="conteudo-principal">{children}</main>
        <footer className="rodape">
          Zuuuuca • Desenvolvimento Front-End - 4º Bimestre
        </footer>
      </body>
    </html>
  );
}
