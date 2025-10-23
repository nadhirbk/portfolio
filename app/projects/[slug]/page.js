"use client";

import { useState } from "react";
import { getProjectBySlug } from "@/data/projects";
import { ArrowLeft, Github, ExternalLink, Code2, Palette } from "lucide-react";
import Link from "next/link";

export default function ProjectPage({ params }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const project = getProjectBySlug(params.slug);

  // Si le projet n'existe pas
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#F5F1E8] mb-4">
            Projet non trouvé
          </h1>
          <Link href="/#projects" className="text-[#5B7AA6] hover:underline">
            Retour aux projets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ${
        isDarkMode ? "bg-[#0F0F0F]" : "bg-white"
      }`}
    >
      {/* Navbar simplifiée */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-700 backdrop-blur-md ${
          isDarkMode
            ? "bg-[#0F0F0F]/80 border-b border-[#2A2A2A]"
            : "bg-white/80 border-b border-[#E5E5E5]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className={`text-2xl font-bold transition-colors duration-700 ${
              isDarkMode
                ? "text-[#F5F1E8] hover:text-[#5B7AA6]"
                : "text-[#2A2A2A] hover:text-[#766B5E]"
            }`}
          >
            NADHIR
          </Link>

          {/* Toggle Dark Mode */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-6 py-2 rounded-full transition-all duration-700 cursor-pointer hover:scale-110 hover:shadow-lg ${
              isDarkMode
                ? "bg-[#F5F1E8] text-[#0F0F0F] hover:shadow-[#F5F1E8]/50"
                : "bg-[#2A2A2A] text-[#F5F1E8] hover:shadow-[#2A2A2A]/50"
            }`}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      {/* Contenu du projet */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Bouton retour */}
        <Link
          href="/#projects"
          className={`inline-flex items-center gap-2 mb-8 transition-colors duration-700 ${
            isDarkMode
              ? "text-[#B0B0B0] hover:text-[#F5F1E8]"
              : "text-[#6B6B6B] hover:text-[#2A2A2A]"
          }`}
        >
          <ArrowLeft size={20} />
          Retour aux projets
        </Link>

        {/* Header du projet */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            {project.category === "dev" ? (
              <Code2
                size={32}
                className={isDarkMode ? "text-[#5B7AA6]" : "text-[#3B4A6B]"}
              />
            ) : (
              <Palette size={32} className="text-[#766B5E]" />
            )}
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                project.category === "dev"
                  ? isDarkMode
                    ? "bg-[#5B7AA6] text-white"
                    : "bg-[#3B4A6B] text-white"
                  : "bg-[#766B5E] text-white"
              }`}
            >
              {project.category === "dev" ? "Dev Web" : "UI/UX Design"}
            </span>
          </div>

          <h1
            className={`text-5xl font-bold mb-4 transition-colors duration-700 ${
              isDarkMode ? "text-[#F5F1E8]" : "text-[#2A2A2A]"
            }`}
          >
            {project.title}
          </h1>

          <p
            className={`text-xl transition-colors duration-700 ${
              isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
            }`}
          >
            {project.shortDescription}
          </p>
        </div>

        {/* Image principale (placeholder pour l'instant) */}
        <div
          className={`aspect-video rounded-2xl mb-12 flex items-center justify-center ${
            isDarkMode ? "bg-[#2A2A2A]" : "bg-[#E5DED0]"
          }`}
        >
          {project.category === "dev" ? (
            <Code2
              size={80}
              className={isDarkMode ? "text-[#5B7AA6]" : "text-[#3B4A6B]"}
            />
          ) : (
            <Palette size={80} className="text-[#766B5E]" />
          )}
        </div>

        {/* Informations du projet */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3
              className={`text-sm font-medium mb-2 transition-colors duration-700 ${
                isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
              }`}
            >
              Rôle
            </h3>
            <p
              className={`font-medium transition-colors duration-700 ${
                isDarkMode ? "text-[#F5F1E8]" : "text-[#2A2A2A]"
              }`}
            >
              {project.role}
            </p>
          </div>
          <div>
            <h3
              className={`text-sm font-medium mb-2 transition-colors duration-700 ${
                isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
              }`}
            >
              Durée
            </h3>
            <p
              className={`font-medium transition-colors duration-700 ${
                isDarkMode ? "text-[#F5F1E8]" : "text-[#2A2A2A]"
              }`}
            >
              {project.duration}
            </p>
          </div>
          <div>
            <h3
              className={`text-sm font-medium mb-2 transition-colors duration-700 ${
                isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
              }`}
            >
              Année
            </h3>
            <p
              className={`font-medium transition-colors duration-700 ${
                isDarkMode ? "text-[#F5F1E8]" : "text-[#2A2A2A]"
              }`}
            >
              {project.year}
            </p>
          </div>
        </div>

        {/* Description complète */}
        <div className="mb-12">
          <h2
            className={`text-3xl font-bold mb-4 transition-colors duration-700 ${
              isDarkMode ? "text-[#F5F1E8]" : "text-[#2A2A2A]"
            }`}
          >
            À propos du projet
          </h2>
          <p
            className={`text-lg leading-relaxed transition-colors duration-700 ${
              isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
            }`}
          >
            {project.fullDescription}
          </p>
        </div>

        {/* Technologies */}
        <div className="mb-12">
          <h2
            className={`text-3xl font-bold mb-4 transition-colors duration-700 ${
              isDarkMode ? "text-[#F5F1E8]" : "text-[#2A2A2A]"
            }`}
          >
            Technologies / Outils
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-default ${
                  project.category === "dev"
                    ? isDarkMode
                      ? "bg-[#2A2A2A] text-[#5B7AA6] border border-[#5B7AA6] hover:bg-[#5B7AA6] hover:text-white"
                      : "bg-white border-2 border-[#766B5E] text-[#766B5E] hover:bg-[#766B5E] hover:text-white"
                    : isDarkMode
                    ? "bg-[#2A2A2A] text-[#766B5E] border border-[#766B5E] hover:bg-[#766B5E] hover:text-white"
                    : "bg-white border-2 border-[#766B5E] text-[#766B5E] hover:bg-[#766B5E] hover:text-white"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Défis */}
        <div className="mb-12">
          <h2
            className={`text-3xl font-bold mb-4 transition-colors duration-700 ${
              isDarkMode ? "text-[#F5F1E8]" : "text-[#2A2A2A]"
            }`}
          >
            Défis rencontrés
          </h2>
          <p
            className={`text-lg leading-relaxed transition-colors duration-700 ${
              isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
            }`}
          >
            {project.challenges}
          </p>
        </div>

        {/* Résultats */}
        <div className="mb-12">
          <h2
            className={`text-3xl font-bold mb-4 transition-colors duration-700 ${
              isDarkMode ? "text-[#F5F1E8]" : "text-[#2A2A2A]"
            }`}
          >
            Résultats
          </h2>
          <p
            className={`text-lg leading-relaxed transition-colors duration-700 ${
              isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
            }`}
          >
            {project.results}
          </p>
        </div>

        {/* Liens */}
        <div className="flex gap-4">
          {project.liveUrl && project.liveUrl !== "#" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                project.category === "dev"
                  ? isDarkMode
                    ? "bg-[#5B7AA6] text-white hover:bg-[#4A6A95]"
                    : "bg-[#3B4A6B] text-white hover:bg-[#2A3A5B]"
                  : "bg-[#766B5E] text-white hover:bg-[#665B4E]"
              }`}
            >
              <ExternalLink size={20} />
              Voir le projet
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 border-2 ${
                isDarkMode
                  ? "border-[#F5F1E8] text-[#F5F1E8] hover:bg-[#F5F1E8] hover:text-[#0F0F0F]"
                  : "border-[#2A2A2A] text-[#2A2A2A] hover:bg-[#2A2A2A] hover:text-white"
              }`}
            >
              <Github size={20} />
              Voir le code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
