// import { SetStateAction } from 'react';

// interface EmailEditorProps {
//   // participantGroups: string[];
//   // selectedRecipientGroups: string[];
//   // handleParticipantGroupsChange: (group: string) => void;
//   // //setEmailBody: Dispatch<SetStateAction<string>>;
//   // //setSubject: Dispatch<SetStateAction<string>>;
// }

const EmailEditor = (): JSX.Element => {
  return (
    <>
      <p>Need to redo this</p>
      {/* <Text>
        <Checkbox.Group
          defaultValue={['participants']}
          label="Select recipient"
          description="This is anonymous"
          withAsterisk
        >
          {props.participantGroups &&
            props.participantGroups.map(group => (
              <Checkbox
                name={group}
                id={group}
                checked={props.selectedRecipientGroups.includes(group)}
                key={`participant_checkbox_${group}`}
                onChange={() => props.handleParticipantGroupsChange(group)}
              ></Checkbox>
            ))}
        </Checkbox.Group>

        <Heading as="h2">Subject</Heading>
        <Input
          placeholder="Email subject"
          onChange={e => {
            props.setSubject(e.target.value);
          }}
        />

        <Heading as="h2">Content</Heading>
      </Stack> */}
    </>
  );
};

export default EmailEditor;
