import MyBucketsComponent from 'components/MyBuckets';
import CommonLayout from 'layouts/CommonLayout';
import Title from 'components/Common/Title';

export default function MyBuckets() {
  return (
    // main page content
    <>
      <Title titleText="My Buckets | Vault Aggregator" />
      <MyBucketsComponent />
      {/* common layout contains components which are universally shared in the entire UI */}
      <CommonLayout />
    </>
  );
}
