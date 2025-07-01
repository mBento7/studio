import SearchShowcase from './SearchShowcase';
import { LayoutDecider } from '@/components/layout/layout-decider';

export default function SearchPage() {
  return (
    <LayoutDecider>
      <SearchShowcase />
    </LayoutDecider>
  );
}