import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Heart } from "lucide-react";
import { DevotionalCard } from "@/components/devotionals/Card";
import { Devotional, TableRow } from "@/types/Tables";
import { getDevotionals } from "@/actions/Devotional";
import Highlights from "@/components/utils/Highlights";

export default async function Home() {
  const { data: allDevotionals } = await getDevotionals();

  const recentDevotionals = allDevotionals?.slice(0, 3) || [];

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="text-center py-20 px-4 space-y-6">
        <h1 className="text-fluid-3xl font-bold text-foreground max-w-4xl mx-auto leading-tight">
          Transforme sua rotina com{" "}
          <span className="text-primary">constância</span> e propósito.
        </h1>
        <p className="text-fluid-base text-muted max-w-2xl mx-auto">
          Abide é o seu lugar de permanência. Encontre devocionais diários,
          estudos bíblicos e a paz que você precisa para enfrentar o dia.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/devotionals"
            className="bg-primary text-primary-foreground font-semibold py-3 px-8 rounded-full hover:bg-primary-hover transition-all flex items-center gap-2"
          >
            Ler Devocionais <ArrowRight size={20} />
          </Link>
          <Link
            href="/about"
            className="text-foreground font-medium py-3 px-8 border border-border rounded-full hover:bg-surface transition-all"
          >
            Saiba Mais
          </Link>
        </div>
      </section>

      {recentDevotionals.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-fluid-xl font-bold flex items-center gap-2">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
              Devocionais
            </h2>
            <Link
              href="/devotionals"
              className="text-primary hover:underline text-sm font-medium flex items-center gap-2"
            >
              Ver todos <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentDevotionals.map((item: Devotional) => (
              <DevotionalCard key={item.id} data={item} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-surface border border-border radius-md py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <Highlights
            icon={<Clock size={32} />}
            title="Tempo com Qualidade"
            description="Leituras pensadas para caber na sua rotina, sem perder a profundidade bíblica."
          />

          <Highlights
            icon={<BookOpen size={32} />}
            title="Base Bíblica"
            description="Todo conteúdo é fundamentado nas escrituras para garantir seu crescimento real."
          />

          <Highlights
            icon={<Heart size={32} />}
            title="Paz Interior"
            description="Comece ou termine o dia focando no que realmente importa: sua conexão com Deus."
          />
        </div>
      </section>
    </div>
  );
}
