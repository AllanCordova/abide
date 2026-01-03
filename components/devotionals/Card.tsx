import { Devotional, DaySubscriptions } from "@/types/Tables";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { getProfileById } from "@/lib/auth";
import { getSubscriptionByDevotional } from "@/actions/UserSubscriptions";
import { getAllSubscribed } from "@/actions/DaySubscriptions";
import { getDevotionalDays } from "@/actions/DevotionalDays";
import { DevotionalProgress } from "./DevotionalProgress";
import { DevotionalActions } from "./DevotionalActions";
import { getArrayData, getDataOrNull } from "@/lib/api-helpers";

interface DevotionalCardProps {
  data: Devotional;
}

export async function DevotionalCard({ data }: DevotionalCardProps) {
  const { id, title, description, slug, created_at, image_url, author_id } =
    data;

  const authorResponse = await getProfileById(author_id);
  const subscriptionResponse = await getSubscriptionByDevotional(id);
  const days = getArrayData(await getDevotionalDays(id));
  const completedDays = getArrayData(await getAllSubscribed(id));

  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString("pt-BR")
    : null;

  const authorName = authorResponse.data?.name || "Autor desconhecido";
  const subscription = getDataOrNull(subscriptionResponse);
  const isSubscribed = !!subscription;
  const subscribedId = subscription?.id || null;
  const completedCount = completedDays.filter(
    (d: DaySubscriptions) => d.is_completed
  ).length;

  return (
    <div className="relative flex flex-col h-full bg-surface border border-border rounded-lg hover:border-primary/50 transition-colors duration-300 group overflow-hidden">
      <div className="absolute top-2 right-2 z-10">
        <DevotionalActions
          devotionalId={id}
          subscriptionId={subscribedId}
        />
      </div>

      {image_url && (
        <div className="relative w-full h-48 bg-muted/10">
          <Image
            src={image_url}
            alt={title}
            fill
            quality={100}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-fluid flex flex-col flex-grow p-4">
        {" "}
        <div className="flex justify-between items-center mb-3 text-sm text-muted">
          {formattedDate && (
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {formattedDate}
            </span>
          )}
          <span className="flex items-center gap-1 text-primary/80">
            <User size={14} /> {authorName}
          </span>
        </div>
        <Link href={`/devotionals/${slug}`}>
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-1">
            {title}
          </h3>
        </Link>
        <p className="text-base text-muted mb-4 line-clamp-3">{description}</p>
        {isSubscribed && days.length > 0 && (
          <DevotionalProgress
            totalDays={days.length}
            completedCount={completedCount}
            showIcon={false}
            compact={false}
          />
        )}
        <div className="mt-auto flex gap-3 items-center">
          <Link
            href={`/devotionals/${slug}`}
            className="flex-1 inline-flex justify-center items-center bg-primary text-primary-foreground font-semibold py-2 px-4 rounded hover:bg-primary-hover transition-colors text-center"
          >
            Ler
          </Link>
        </div>
      </div>
    </div>
  );
}
