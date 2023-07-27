import { Badge, Flex } from '@chakra-ui/react';
import { EventStatusBadge } from 'components';
import { EventStatusType } from 'types';

type EventCardHeaderProps = {
  featured: boolean;
  status: EventStatusType;
};

const EventCardHeader = (props: EventCardHeaderProps) => {
  const { featured, status } = props;
  return (
    <Flex justifyContent='space-between' alignItems='center'>
      {
        featured &&
        <Badge colorScheme='orange' mt={2} ml={2}>
          Featured
        </Badge>
      }
      <EventStatusBadge status={status} />
    </Flex>
  );
};

export default EventCardHeader;
