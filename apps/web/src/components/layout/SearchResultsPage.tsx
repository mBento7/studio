import React, { useEffect, useState } from "react";
import { AppContainer } from "./app-container";
import { profileLayouts } from "../profile-layouts";
import type { UserProfile } from "@/lib/types";
import FreeSearchResultCard from "../profile-layouts/FreeProfileLayout/SearchResultCard";
import StandardSearchResultCard from "../profile-layouts/StandardProfileLayout/SearchResultCard";
import PremiumProfileSearchResultCard from "../profile-layouts/PremiumProfileLayout/SearchResultCard";
import { getAllUserProfiles } from '@/services/profile.service';

const SearchResultsPage = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const realUsers = await getAllUserProfiles(30);
      setUsers(realUsers);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Resultados da Pesquisa</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => {
            let SearchResultComponent;
            if (user.plan === 'free') {
              SearchResultComponent = FreeSearchResultCard;
            } else if (user.plan === 'standard') {
              SearchResultComponent = user.layoutTemplateId === 'standard' ? StandardSearchResultCard : FreeSearchResultCard;
            } else if (user.plan === 'premium') {
              SearchResultComponent = user.layoutTemplateId === 'premiumplus' ? PremiumProfileSearchResultCard : StandardSearchResultCard;
            } else {
              SearchResultComponent = FreeSearchResultCard;
            }
            return <SearchResultComponent key={user.username} user={user} />;
          })}
        </div>
      )}
    </>
  );
};

export default SearchResultsPage; 