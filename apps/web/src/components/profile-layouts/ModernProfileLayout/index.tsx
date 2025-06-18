"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, MapPin, Mail, Phone, Globe, Linkedin, Twitter, Instagram, Github, Youtube, Star, Award, Briefcase, GraduationCap, Calendar, TrendingUp, Crown, Edit3, QrCode, Download, MessageSquare, Eye, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";

// Adapte as props conforme o padrão do projeto
const ModernProfileLayout = ({ user, primaryColorHex, isCurrentUserProfile, qrCodeUrl, onPortfolioItemClick, toast, mounted }) => {
  // Fallbacks seguros
  const skills = user.skills || [];
  const experience = user.experience || [];
  const education = user.education || [];
  const portfolio = user.portfolio || [];
  const services = user.services || [];
  const socialLinks = user.socialLinks || [];
  const location = user.location || { city: '', country: '' };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-3xl shadow-xl border-blue-200">
        <CardHeader className="bg-blue-600 text-white p-6 rounded-t-lg">
          <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
          <p className="text-blue-100">{user.category}</p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Sobre</h2>
              <p className="text-gray-700 mb-4 whitespace-pre-line">{user.bio}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {socialLinks.map((link, idx) => (
                  <Button key={idx} variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}>
                      <Globe className="w-5 h-5" />
                    </a>
                  </Button>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-2 text-gray-600"><Mail className="w-4 h-4" /> {user.email}</span>
                {user.phone && <span className="flex items-center gap-2 text-gray-600"><Phone className="w-4 h-4" /> {user.phone}</span>}
                {location.city && <span className="flex items-center gap-2 text-gray-600"><MapPin className="w-4 h-4" /> {location.city}, {location.country}</span>}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary">{skill}</Badge>
                ))}
              </div>
              <h2 className="text-xl font-semibold mb-2">Portfólio</h2>
              <div className="flex flex-wrap gap-2">
                {portfolio.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="w-20 h-20 rounded-md overflow-hidden border shadow-sm cursor-pointer group relative" onClick={() => onPortfolioItemClick(item)}>
                    <img src={item.imageUrl} alt={item.caption || 'Portfólio'} className="object-cover w-full h-full" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Experiência</h2>
              {experience.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700">
                  {experience.map((exp, idx) => (
                    <li key={idx}><strong>{exp.title}</strong> em {exp.company} ({exp.years})</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Nenhuma experiência listada.</p>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Educação</h2>
              {education.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700">
                  {education.map((edu, idx) => (
                    <li key={idx}><strong>{edu.degree}</strong> de {edu.institution} ({edu.years})</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Nenhuma formação listada.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModernProfileLayout; 