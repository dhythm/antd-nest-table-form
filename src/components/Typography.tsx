import { Typography as AntTypography } from "antd";
import { ComponentProps } from "react";

const { Text, Title, Link, Paragraph } = AntTypography;

const Typography = (props: ComponentProps<typeof AntTypography>) => {
  return (
    <AntTypography
      style={{ backgroundColor: "yellow", ...props.style }}
      {...props}
    />
  );
};

Typography.Text = Text;
Typography.Title = Title;
Typography.Link = Link;
Typography.Paragraph = Paragraph;

export { Typography };
