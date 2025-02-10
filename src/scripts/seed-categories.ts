import { db } from "@/db";
import { categories } from "@/db/schema";

const categoryNames = [
  "Animações",
  "Animais",
  "Aulas",
  "Automóveis",
  "Aviação",
  "Beleza",
  "Ciências",
  "Comédia",
  "Comidas",
  "Construção",
  "Crimes Reais",
  "Cultura",
  "Curiosidades",
  "Desafios",
  "Desenvolvimento Pessoal",
  "Desenhos",
  "Documentários",
  "Economia",
  "Educação",
  "Empreendedorismo",
  "Entretenimento",
  "Esportes",
  "Espiritualidade",
  "Estilo de Vida",
  "Famosos",
  "Física",
  "Filmes",
  "Finanças",
  "Fitness",
  "Fotografia",
  "Games",
  "Gastronomia",
  "Geografia",
  "História",
  "Horror",
  "Humor",
  "Jogos de Tabuleiro",
  "Livros",
  "Música",
  "Natureza",
  "Notícias",
  "Paleontologia",
  "Podcast",
  "Política",
  "Programação",
  "Psicologia",
  "Religião",
  "Review de Produtos",
  "Saúde",
  "Tecnologia",
  "Tutoriais",
  "Vlogs",
  "Viagens",
];

async function main() {
  console.log("Seeding categories...");

  try {
    const values = categoryNames.map((name) => ({
      name,
      description: `Vídeos relacionados à categoria "${name}"`
    }));

    await db.insert(categories).values(values);
    console.log("Categories seeded!");
  } catch (error) {
    console.error("Error seeding categories", error);
    process.exit(1);
  }
}

main();
