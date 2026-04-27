import HeroLeft from '@/components/hero/HeroLeft';
import MetricsStrip from '@/components/sections/MetricsStrip';
import VerticalsGrid from '@/components/sections/VerticalsGrid';
import Pillars from '@/components/sections/Pillars';
import Insights from '@/components/sections/Insights';
import CtaBand from '@/components/sections/CtaBand';

export default function HomePage() {
  return (
    <>
      <HeroLeft/>
      <MetricsStrip/>
      <VerticalsGrid/>
      <Pillars/>
      <Insights/>
      <CtaBand
        title="Partner-to-partner <em>conversations.</em>"
        body="All engagement begins with a direct call. We do not publish fees or allocation terms. We do not respond to inbound capital-raise requests without a personal introduction or executed NDA. If that fits your process, we would like to talk."
      />
    </>
  );
}
