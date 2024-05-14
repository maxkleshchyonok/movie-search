import React from "react";
import { Breadcrumbs, Anchor } from "@mantine/core";
import colors from "@/helpers/index";

type Props = {
  items: {
    title: string;
    href: string;
  }[];
};

function BreadcrumbsElement({ items }: Props) {
  return (
    <Breadcrumbs
      styles={{
        breadcrumb: { color: colors["purple-500"] },
        root: { margin: "2% 0 4% 0" },
      }}
    >
      {items.map((item, index) => (
        <Anchor href={item.href} key={index}>
          {item.title}
        </Anchor>
      ))}
    </Breadcrumbs>
  );
}

export default BreadcrumbsElement;
