import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DevotionalCard } from "@/components/devotionals/Card";
import { Devotional } from "@/types/Tables";
import { getDevotionals } from "@/actions/Devotional";
import { getArrayData } from "@/lib/api-helpers";

export default async function Home() {
  const devotionals = getArrayData(await getDevotionals());
  const recentDevotionals = devotionals.slice(0, 3);

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
    </div>
  );
}
