//import { EventsService } from '@losol/eventuras';
//import { generateSlug } from 'random-word-slugs'; // TODO : replace with custom function
//import { toast } from 'sonner';

//const slug = generateSlug();

export default function CreateEvent() {
  //const form = useForm<{ title: string; slug: string }>({
  //  validateInputOnChange: false,

  //  initialValues: {
  //    title: '',
  //    slug: '',
  //  },

  //  validate: {
  //    title: isNotEmpty("Enter your event's title"),
  //    slug: matches(
  //      /^$|^[a-z0-9]+(-[a-z0-9]+)*$/,
  //      'A valid slug consists of lowercase alphanumeric characters and hyphens'
  //    ),
  //  },
  //});

  //async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //  e.preventDefault();
  //  form.validate();

  //  if (!form.isValid()) return;

  //  const eventReturn = await EventsService.postV3Events({
  //    requestBody: {
  //      ...form.values,
  //      slug: form.values.slug || slug,
  //      organizationId: Number(process.env.NEXT_PUBLIC_ORGANIZATION_ID ?? '1'),
  //    },
  //  });
  //  console.log(eventReturn);

  //  // TODO : notice / toast
  //}

  return (
    //<Popover width={300} position="bottom-start" shadow="md" withArrow trapFocus>
    //  <Popover.Target>
    //    {/*<Button variant="outline">{t('Create event')}</Button>*/}
    //    <Button variant="outline">Create event</Button>
    //  </Popover.Target>
    //  <Popover.Dropdown
    //    sx={theme => ({
    //      background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    //    })}
    //  >
    //    <Box component="form" onSubmit={handleSubmit} mx="auto">
    //      <TextInput label="Title" withAsterisk mt="md" {...form.getInputProps('title')} />
    //      <TextInput label="Slug" placeholder={slug} mt="md" {...form.getInputProps('slug')} />

    //      <Group position="center" mt="xl">
    //        <Button type="submit" variant="outline">
    //          Create event
    //        </Button>
    //      </Group>
    //    </Box>
    //  </Popover.Dropdown>
    //</Popover>
    <div>TODO</div>
  );
}