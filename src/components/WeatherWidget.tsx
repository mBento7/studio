import React from 'react';

export default function WeatherWidget() {
  // Este é um componente mock. Em uma aplicação real, você integraria
  // com uma API de previsão do tempo (ex: OpenWeatherMap, AccuWeather).
  const weatherData = {
    city: "São Paulo",
    temperature: "22°C",
    condition: "Ensolarado",
    icon: "☀️",
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg mb-6 flex items-center justify-between">
      <div>
        <h3 className="font-bold text-xl mb-1">{weatherData.city}</h3>
        <p className="text-4xl font-extrabold mb-1">{weatherData.temperature}</p>
        <p className="text-sm">{weatherData.condition}</p>
      </div>
      <div className="text-5xl">{weatherData.icon}</div>
    </div>
  );
} 