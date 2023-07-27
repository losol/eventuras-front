import { Box, Text } from '@chakra-ui/react';

type EventMetasProps = {
  metas: string[];
};

const EventMetas = (props: EventMetasProps) => {
  const { metas } = props;
  return (
    <Text fontSize='sm' mb='1' color='blackAlpha.600' display='flex' alignItems='baseline'>
      {
        metas.map((meta, index) => {
          const isNotLast = index !== metas.length - 1;
          return (
            <Box mr={2} as='span' key={index}>
              {meta}
              {isNotLast && '•'}
            </Box>
          );
        })
      }
    </Text>
  );
};

export default EventMetas;
