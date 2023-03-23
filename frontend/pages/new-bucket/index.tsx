import NewBucketComponent from 'components/NewBucket';
import CommonLayout from 'layouts/CommonLayout';
import Title from 'components/Common/Title';

export default function NewBucket() {
  return (
    // main page content
    <>
      <Title titleText="New Bucket | Scaling 2023" />
      <NewBucketComponent />
      {/* common layout contains components which are universally shared in the entire UI */}
      <CommonLayout />
    </>
  );
}
