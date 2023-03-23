import React from 'react';
import Head from 'next/head';

interface TitleProps {
  titleText?: string;
}

export default function Title({ titleText }: TitleProps) {
  return (
    <Head>
      <title>{titleText ?? 'Vaults Aggregator'}</title>
    </Head>
  );
}
