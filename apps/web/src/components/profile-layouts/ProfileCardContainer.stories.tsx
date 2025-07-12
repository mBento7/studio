import React from "react";
import { ProfileCardContainer } from "./ProfileCardContainer";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ProfileCardContainer> = {
  title: "ProfileLayouts/ProfileCardContainer",
  component: ProfileCardContainer,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ProfileCardContainer>;

export const Default: Story = {
  args: {
    children: <div style={{ padding: 24 }}>Conteúdo do Card de Perfil</div>,
  },
}; 