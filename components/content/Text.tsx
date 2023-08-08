interface TextProps {
  children: React.ReactNode;
  as?: 'div' | 'span' | 'p';
}

const Text = (props: TextProps) => {
  const TextComponent = props.as || 'div';
  return (
    <>
      <TextComponent>{props.children}</TextComponent>
    </>
  );
};

export default Text;
