import { Meta } from '@storybook/react';
import React from 'react';

import { Box } from './Box';

const meta: Meta<typeof Box> = {
  component: Box,
  title: 'Layout/Box',
  tags: ['autodocs'],
};

export default meta;

// Dirty hack to get tailwind to sniff out all the classes
export const marginClasses =
  'm-0 m-1 m-2 m-3 m-4 m-5 m-6 m-7 m-8 m-9 m-10 m-11 m-12 m-13 m-14 m-15 m-16 ' +
  'mx-0 mx-1 mx-2 mx-3 mx-4 mx-5 mx-6 mx-7 mx-8 mx-9 mx-10 mx-11 mx-12 mx-13 mx-14 mx-15 mx-16 ' +
  'my-0 my-1 my-2 my-3 my-4 my-5 my-6 my-7 my-8 my-9 my-10 my-11 my-12 my-13 my-14 my-15 my-16 ' +
  'ml-0 ml-1 ml-2 ml-3 ml-4 ml-5 ml-6 ml-7 ml-8 ml-9 ml-10 ml-11 ml-12 ml-13 ml-14 ml-15 ml-16 ' +
  'mt-0 mt-1 mt-2 mt-3 mt-4 mt-5 mt-6 mt-7 mt-8 mt-9 mt-10 mt-11 mt-12 mt-13 mt-14 mt-15 mt-16 ' +
  'mr-0 mr-1 mr-2 mr-3 mr-4 mr-5 mr-6 mr-7 mr-8 mr-9 mr-10 mr-11 mr-12 mr-13 mr-14 mr-15 mr-16 ' +
  'mb-0 mb-1 mb-2 mb-3 mb-4 mb-5 mb-6 mb-7 mb-8 mb-9 mb-10 mb-11 mb-12 mb-13 mb-14 mb-15 mb-16';

export const paddingClasses =
  'p-0 p-1 p-2 p-3 p-4 p-5 p-6 p-7 p-8 p-9 p-10 p-11 p-12 p-13 p-14 p-15 p-16 ' +
  'px-0 px-1 px-2 px-3 px-4 px-5 px-6 px-7 px-8 px-9 px-10 px-11 px-12 px-13 px-14 px-15 px-16 ' +
  'py-0 py-1 py-2 py-3 py-4 py-5 py-6 py-7 py-8 py-9 py-10 py-11 py-12 py-13 py-14 py-15 py-16 ' +
  'pl-0 pl-1 pl-2 pl-3 pl-4 pl-5 pl-6 pl-7 pl-8 pl-9 pl-10 pl-11 pl-12 pl-13 pl-14 pl-15 pl-16 ' +
  'pt-0 pt-1 pt-2 pt-3 pt-4 pt-5 pt-6 pt-7 pt-8 pt-9 pt-10 pt-11 pt-12 pt-13 pt-14 pt-15 pt-16 ' +
  'pr-0 pr-1 pr-2 pr-3 pr-4 pr-5 pr-6 pr-7 pr-8 pr-9 pr-10 pr-11 pr-12 pr-13 pr-14 pr-15 pr-16 ' +
  'pb-0 pb-1 pb-2 pb-3 pb-4 pb-5 pb-6 pb-7 pb-8 pb-9 pb-10 pb-11 pb-12 pb-13 pb-14 pb-15 pb-16';

export const gapClasses =
  'gap-0 gap-1 gap-2 gap-3 gap-4 gap-5 gap-6 gap-7 gap-8 gap-9 gap-10 gap-11 gap-12 gap-13 gap-14 gap-15 gap-16 ' +
  'gap-x-0 gap-x-1 gap-x-2 gap-x-3 gap-x-4 gap-x-5 gap-x-6 gap-x-7 gap-x-8 gap-x-9 gap-x-10 gap-x-11 gap-x-12 gap-x-13 gap-x-14 gap-x-15 gap-x-16 ' +
  'gap-y-0 gap-y-1 gap-y-2 gap-y-3 gap-y-4 gap-y-5 gap-y-6 gap-y-7 gap-y-8 gap-y-9 gap-y-10 gap-y-11 gap-y-12 gap-y-13 gap-y-14 gap-y-15 gap-y-16';

// Basic usage
export const Default = () => <Box>Default Box</Box>;

// Demonstrating Padding
export const WithPadding = () => <Box p={4}>Box with Padding</Box>;
export const WithSpecificPadding = () => (
  <Box pt={2} pb={4}>
    Box with Specific Top and Bottom Padding
  </Box>
);

// Demonstrating Margin
export const WithMargin = () => <Box m={4}>Box with Margin</Box>;
export const WithSpecificMargin = () => (
  <Box mt={2} mb={4}>
    Box with Specific Top and Bottom Margin
  </Box>
);

// Demonstrating Gap
export const WithGap = () => (
  <Box gap={2}>
    <div>Child 1</div>
    <div>Child 2</div>
  </Box>
);

// Combined styles
export const CombinedStyles = () => (
  <Box m={2} p={4} gap={2}>
    <div>Combined Styles</div>
    <div>Child 1</div>
    <div>Child 2</div>
  </Box>
);

// Custom element
export const CustomElement = () => (
  <Box as="section" m={3}>
    Section Box
  </Box>
);

// With custom class name
export const WithCustomClassName = () => (
  <Box className="custom-class" p={2}>
    Box with Custom Class Name
  </Box>
);
