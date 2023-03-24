import ExistingBuckets from 'components/ExistingBuckets';
import CommonLayout from 'layouts/CommonLayout';

export default function Home() {
  return (
    // main page content
    <>
      <ExistingBuckets />
      {/* common layout contains components which are universally shared in the entire UI */}
      <CommonLayout />
    </>
  );
}
