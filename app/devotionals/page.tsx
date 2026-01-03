import { getDevotionals } from "@/actions/Devotional";
import { DevotionalCard } from "@/components/devotionals/Card";
import { BookOpen } from "lucide-react";
import { SearchInput } from "@/components/devotionals/SearchInput";
import { getArrayData } from "@/lib/api-helpers";

interface PageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function DevotionalsPage({ searchParams }: PageProps) {
  const { q } = await searchParams;

  const devotionals = getArrayData(await getDevotionals(q));

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <h1 className="text-fluid-2xl font-bold text-foreground">
          Devocionais Diários
        </h1>
        <p className="text-muted text-fluid-base max-w-2xl">
          Explore nossa coleção de estudos bíblicos e reflexões para fortalecer
          sua caminhada e trazer clareza para o seu dia.
        </p>

        <SearchInput />
      </div>

      {devotionals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {devotionals.map((devotional) => (
            <DevotionalCard key={devotional.id} data={devotional} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-3xl bg-surface/50">
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
            <BookOpen size={32} className="text-muted" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            {q
              ? `Nenhum resultado para "${q}"`
              : "Nenhum devocional encontrado"}
          </h3>
          <p className="text-muted mt-2 max-w-sm">
            {q
              ? "Tente buscar por outras palavras-chave."
              : "Parece que ainda não publicamos nenhum conteúdo. Volte em breve!"}
          </p>
        </div>
      )}
    </div>
  );
}
