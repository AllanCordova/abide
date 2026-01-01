import { getDevotionals } from "@/actions/Devotional";
import { DevotionalCard } from "@/components/devotionals/Card"; // Ajuste o caminho se necessário
import { Devotional } from "@/types/Tables";
import { BookOpen, Search } from "lucide-react";

// Server Component (Async)
export default async function DevotionalsPage() {
  // Busca os dados do banco
  const result = await getDevotionals();
  const devotionals: Devotional[] = result.data || [];

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      {/* --- CABEÇALHO DA PÁGINA --- */}
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <h1 className="text-fluid-2xl font-bold text-foreground">
          Devocionais Diários
        </h1>
        <p className="text-muted text-fluid-base max-w-2xl">
          Explore nossa coleção de estudos bíblicos e reflexões para fortalecer
          sua caminhada e trazer clareza para o seu dia.
        </p>

        {/* Barra de Pesquisa (Visual por enquanto) */}
        <div className="w-full max-w-md relative mt-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted" />
          </div>
          <input
            type="text"
            placeholder="Buscar por título ou tema..."
            className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl leading-5 bg-surface text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition duration-150 ease-in-out sm:text-sm"
          />
        </div>
      </div>

      {/* --- GRID DE CARDS --- */}
      {devotionals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devotionals.map((devotional) => (
            // Como o Card é Async, o React lida com a renderização dele
            <DevotionalCard key={devotional.id} data={devotional} />
          ))}
        </div>
      ) : (
        /* --- EMPTY STATE (Caso não tenha dados) --- */
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-3xl bg-surface/50">
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
            <BookOpen size={32} className="text-muted" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            Nenhum devocional encontrado
          </h3>
          <p className="text-muted mt-2 max-w-sm">
            Parece que ainda não publicamos nenhum conteúdo. Volte em breve para
            novas leituras!
          </p>
        </div>
      )}
    </div>
  );
}
