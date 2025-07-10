import { useState } from "react";

interface ProfileVisibilitySettingsProps {
  publicVisibility: boolean;
  publicSections: Record<string, boolean>;
  onSave: (settings: { public_visibility: boolean; public_sections: Record<string, boolean> }) => void;
}

const SECTION_LABELS: Record<string, string> = {
  basic: "Informações básicas",
  experience: "Experiência",
  education: "Formação acadêmica",
  skills: "Competências",
  photo: "Foto de perfil",
  title: "Título"
};

export function ProfileVisibilitySettings({ publicVisibility, publicSections, onSave }: ProfileVisibilitySettingsProps) {
  const [visibility, setVisibility] = useState(publicVisibility);
  const [sections, setSections] = useState({ ...publicSections });

  const handleToggleSection = (section: string) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = () => {
    onSave({ public_visibility: visibility, public_sections: sections });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Configurações de perfil público</h2>
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={visibility}
          onChange={() => setVisibility(!visibility)}
          className="mr-2"
        />
        Visibilidade pública ativada
      </label>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Seções exibidas publicamente</h3>
        {Object.keys(SECTION_LABELS).map((section) => (
          <label key={section} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={sections[section]}
              onChange={() => handleToggleSection(section)}
              disabled={!visibility}
              className="mr-2"
            />
            {SECTION_LABELS[section]}
          </label>
        ))}
      </div>
      <button
        onClick={handleSave}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
      >
        Salvar
      </button>
    </div>
  );
} 