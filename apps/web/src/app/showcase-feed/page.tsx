import ShowcaseFeed from '@/components/feed/ShowcaseFeed';
import { LayoutDecider } from '@/components/layout/layout-decider';

export default function ShowcaseFeedPage() {
  return (
    <LayoutDecider>
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        <ShowcaseFeed />
      </div>
    </LayoutDecider>
  );
} 