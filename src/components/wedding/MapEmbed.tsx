type MapEmbedProps = {
  embedUrl: string;
  title: string;
};

export function MapEmbed({ embedUrl, title }: MapEmbedProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border-soft shadow-[var(--shadow-soft)]">
      <iframe
        title={title}
        src={embedUrl}
        className="aspect-[16/10] min-h-[240px] w-full border-0 sm:min-h-[320px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
