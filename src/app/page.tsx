import {
  backgroundMusic,
  calendarEvent,
  ceremony,
  colorPalette,
  countdownTargetIso,
  coupleNames,
  entourage,
  getGuestWelcome,
  guestAttire,
  heroBackgroundImage,
  navMonogram,
  reception,
  receptionMapEmbedUrl,
  receptionMapsLink,
  sponsorAttire,
  themeDescription,
  themeHeadline,
  weddingDateLabel,
} from "@/content/wedding";
import { CeremonySection } from "@/components/wedding/CeremonySection";
import { DressCodeSection } from "@/components/wedding/DressCodeSection";
import { EntourageSection } from "@/components/wedding/EntourageSection";
import { FloatingRsvpButton } from "@/components/wedding/FloatingRsvpButton";
import { Footer } from "@/components/wedding/Footer";
import { GuestWelcomeBanner } from "@/components/wedding/GuestWelcomeBanner";
import { HeroSection } from "@/components/wedding/HeroSection";
import { OpeningSplash } from "@/components/wedding/OpeningSplash";
import { RSVPSection } from "@/components/wedding/RSVPSection";
import { ReceptionSection } from "@/components/wedding/ReceptionSection";
import { SectionDivider } from "@/components/wedding/SectionDivider";
import { SiteNav } from "@/components/wedding/SiteNav";

type PageProps = {
  searchParams: Promise<{ guest?: string | string[] }>;
};

export default async function Home({ searchParams }: PageProps) {
  const sp = await searchParams;
  const guestName = getGuestWelcome(sp);

  return (
    <>
      <SiteNav monogram={navMonogram} />
      <GuestWelcomeBanner guestName={guestName} />
      <OpeningSplash coupleNames={coupleNames} />
      <main id="main">
        <HeroSection
          coupleNames={coupleNames}
          weddingDateLabel={weddingDateLabel}
          countdownTargetIso={countdownTargetIso}
          heroImage={heroBackgroundImage}
        />
        <SectionDivider />
        <CeremonySection
          title={ceremony.title}
          churchName={ceremony.churchName}
          addressLines={ceremony.addressLines}
          dateLabel={ceremony.dateLabel}
          timeLabel={ceremony.timeLabel}
        />
        <SectionDivider />
        <ReceptionSection
          venueName={reception.venueName}
          addressLines={reception.addressLines}
          dateLabel={reception.dateLabel}
          timeLabel={reception.timeLabel}
          mapEmbedUrl={receptionMapEmbedUrl}
          mapsLink={receptionMapsLink}
        />
        <SectionDivider />
        <DressCodeSection
          themeHeadline={themeHeadline}
          themeDescription={themeDescription}
          colors={colorPalette}
          guestAttire={guestAttire}
          sponsorAttire={sponsorAttire}
        />
        <SectionDivider />
        <EntourageSection groups={entourage} />
        <SectionDivider />
        <RSVPSection calendarEvent={calendarEvent} />
      </main>
      <Footer coupleNames={coupleNames} musicSrc={backgroundMusic.src} />
      <FloatingRsvpButton />
    </>
  );
}
