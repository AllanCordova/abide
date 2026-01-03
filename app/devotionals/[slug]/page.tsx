import { getDevotionalsBySlug } from "@/actions/Devotional";
import { getDevotionalDays } from "@/actions/DevotionalDays";
import { getProfileById } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { ContentDevotional } from "@/components/devotionals/ContentDevotional";
import { DevotionalDaysContent } from "@/components/devotionals/devotional_days/DevotionalDaysContent";
import { getAllSubscribed } from "@/actions/DaySubscriptions";
import { assertSuccess, getArrayData } from "@/lib/api-helpers";

interface DevotionalPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ShowDevotional({ params }: DevotionalPageProps) {
  const { slug } = await params;

  const devotional = assertSuccess(await getDevotionalsBySlug(slug));
  const days = getArrayData(await getDevotionalDays(devotional.id));
  const completedDays = getArrayData(await getAllSubscribed(devotional.id));

  const authorResponse = await getProfileById(devotional.author_id);
  const authorName = authorResponse.data?.name || "Equipe Abide";

  return (
    <article className="min-h-screen pb-20">
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-surface">
        {devotional.image_url ? (
          <Image
            src={devotional.image_url}
            alt={devotional.title}
            fill
            className="object-cover opacity-60"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <div className="absolute top-6 left-4 md:left-8 z-10">
          <Link
            href="/devotionals"
            className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors bg-background/50 backdrop-blur-md px-4 py-2 rounded-full border border-border"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Voltar</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <ContentDevotional
          devotional={devotional}
          authorName={authorName}
          day={days}
        />

        <DevotionalDaysContent
          days={days}
          slug={slug}
          completedDays={completedDays}
        />
      </div>
    </article>
  );
}
