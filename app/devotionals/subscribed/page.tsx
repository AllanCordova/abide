import { getSubscribedDevotionals } from "@/actions/UserSubscriptions";
import { DevotionalCard } from "@/components/devotionals/Card";
import { Devotional } from "@/types/Tables";
import { BookOpen, Heart } from "lucide-react";

export default async function DevotionalsSub() {
  const response = await getSubscribedDevotionals();
  const devotionals: Devotional[] = response.data || [];

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
          <Heart size={32} className="text-primary" />
        </div>
        <h1 className="text-fluid-2xl font-bold text-foreground">
          Meus Devocionais
        </h1>
        <p className="text-muted text-fluid-base max-w-2xl">
          Continue sua jornada de fé com os devocionais que você está seguindo.
          Acompanhe seu progresso e mantenha-se firme na palavra.
        </p>
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
            Nenhum devocional inscrito
          </h3>
          <p className="text-muted mt-2 max-w-sm">
            Você ainda não se inscreveu em nenhum devocional. Explore nossa
            coleção e comece sua jornada de fé hoje!
          </p>
        </div>
      )}
    </div>
  );
}
