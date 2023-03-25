import ExploreBuckets from 'components/ExploreBuckets';
import CommonLayout from 'layouts/CommonLayout';

export default function Home() {
  return (
    // main page content
    <>
      <ExploreBuckets />
      {/* common layout contains components which are universally shared in the entire UI */}
      <CommonLayout />
    </>
  );
}
