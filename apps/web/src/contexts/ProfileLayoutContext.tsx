'use client';

import React, { createContext, useContext } from 'react';

export type ProfileLayoutTier = 'free' | 'standard' | 'premium';

type ProfileLayoutContextType = {
  hideRightSidebar: boolean;
  layoutTier: ProfileLayoutTier;
};

const ProfileLayoutContext = createContext<ProfileLayoutContextType>({ hideRightSidebar: false, layoutTier: 'free' });

export const useProfileLayout = () => useContext(ProfileLayoutContext);

export const ProfileLayoutProvider = ({
  children,
  hideRightSidebar = false,
  layoutTier = 'free'
}: {
  children: React.ReactNode;
  hideRightSidebar?: boolean;
  layoutTier?: ProfileLayoutTier;
}) => (
  <ProfileLayoutContext.Provider value={{ hideRightSidebar, layoutTier }}>
    {children}
  </ProfileLayoutContext.Provider>
);
