import { Badge, Flex } from '@chakra-ui/react';
import { EventStatusBadge } from 'components';
import { EventInfoStatus } from '@losol/eventuras';

type EventCardHeaderProps = {
  // TODO: Delete undefined? when API will be ready
  featured?: boolean;
  status?: EventInfoStatus;
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
