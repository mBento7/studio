import { MapPin } from "lucide-react";

interface LocationInfoProps {
  city?: string;
  country?: string;
  mapsLink?: string;
}

export function LocationInfo({ city, country, mapsLink }: LocationInfoProps) {
  if (!city && !country && !mapsLink) return null;
  return (
    <div className="flex items-center gap-2">
      {mapsLink ? (
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors duration-150 shadow cursor-pointer"
          title="Abrir no Google Maps"
          style={{ marginRight: 0 }}
        >
          <MapPin className="w-5 h-5" />
        </a>
      ) : (
        <MapPin className="w-5 h-5 text-muted-foreground" />
      )}
      <span>
        {city}
        {country ? `, ${country}` : ''}
      </span>
    </div>
  );
} 