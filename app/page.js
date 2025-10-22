"use client";

import React, { useState, useEffect, useRef } from "react";
import twemoji from "twemoji";
import Link from "next/link";
import { getAllProjects } from "@/data/projects";
import {
  Code2,
  Palette,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function Portfolio() {
  const [mouseX, setMouseX] = useState(50);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // État persistant pour le mode
  const [scrollY, setScrollY] = useState(0);
  const [projectFilter, setProjectFilter] = useState("all"); // Filtre pour les projets

  // États pour le formulaire
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Scroll en haut au chargement de la page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Parse les émojis avec Twemoji
  useEffect(() => {
    twemoji.parse(document.body, {
      folder: "svg",
      ext: ".svg",
    });
  }, [isDarkMode]); // Re-parse quand le thème change

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setMouseX(x);
    // Met à jour le mode seulement lors du hover sur la section Hero
    const isDevSide = x < 50;
    setIsDarkMode(isDevSide);
  };

  // Gestion de la soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Formulaire valide - envoyer directement
    console.log("Formulaire envoyé:", formData);
    // TODO: Envoyer les données
    alert("Message envoyé avec succès !");
    setFormData({ prenom: "", nom: "", email: "", message: "" });
    setFormErrors({});
  };

  // Gestion des changements de champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Nettoie l'erreur du champ quand l'utilisateur tape
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation en temps réel lors de la perte de focus
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "prenom") {
      if (!value.trim()) {
        error = "Le prénom est requis";
      } else if (value.trim().length < 2) {
        error = "Le prénom doit contenir au moins 2 caractères";
      }
    }

    if (name === "nom") {
      if (!value.trim()) {
        error = "Le nom est requis";
      } else if (value.trim().length < 2) {
        error = "Le nom doit contenir au moins 2 caractères";
      }
    }

    if (name === "email") {
      if (!value.trim()) {
        error = "L'email est requis";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Email invalide";
      }
    }

    if (name === "message") {
      if (!value.trim()) {
        error = "Le message est requis";
      }
    }

    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isDevSide = mouseX < 50;
  const splitPosition = mouseX;

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled ? "shadow-sm" : ""
        }`}
        style={{
          backgroundColor: isScrolled
            ? isDarkMode
              ? "#1A1A1A"
              : "#EDE4D3"
            : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`text-2xl font-bold transition-colors duration-700 cursor-pointer ${
              isDarkMode
                ? "text-[#F5F1E8] hover:text-[#5B7AA6]"
                : "text-[#2A2A2A] hover:text-[#766B5E]"
            }`}
          >
            NADHIR
          </a>
          <div className="flex gap-6 items-center">
            <a
              href="#about"
              className={`transition-colors duration-700 ${
                isDarkMode
                  ? "text-[#B0B0B0] hover:text-[#F5F1E8]"
                  : "text-[#6B6B6B] hover:text-[#2A2A2A]"
              }`}
            >
              À propos
            </a>
            <a
              href="#projects"
              className={`transition-colors duration-700 ${
                isDarkMode
                  ? "text-[#B0B0B0] hover:text-[#F5F1E8]"
                  : "text-[#6B6B6B] hover:text-[#2A2A2A]"
              }`}
            >
              Projets
            </a>
            <a
              href="#contact"
              className={`px-6 py-2 rounded-2xl transition-all duration-700 ${
                isDarkMode
                  ? "bg-[#EDE4D3] text-[#1A1A1A] hover:bg-[#5B7AA6] hover:text-white"
                  : "bg-[#2A2A2A] text-[#EDE4D3] hover:bg-[#766B5E]"
              }`}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
      {/* Hero Section with Split Effect - Sticky for parallax */}
      <section
        className="sticky top-0 h-screen overflow-hidden"
        onMouseMove={handleMouseMove}
        style={{
          zIndex: 1,
        }}
      >
        {/* Dev Side Background (Dark) */}
        <div
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            background: `linear-gradient(135deg, #1A1A1A 0%, #2A2A3A 100%)`,
            opacity: isDevSide ? 1 : 0,
          }}
        />

        {/* Design Side Background (Light) */}
        <div
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            background: `linear-gradient(135deg, #EDE4D3 0%, #F5EDE0 100%)`,
            opacity: !isDevSide ? 1 : 0,
          }}
        />

        {/* Content Container */}
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-2 gap-12">
              {/* Dev Side */}
              <div
                className={`text-left transition-all duration-500 ${
                  isDevSide
                    ? "opacity-100 translate-x-0"
                    : "opacity-40 -translate-x-4"
                }`}
              >
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-full mb-6 border transition-all duration-700 ${
                    isDarkMode
                      ? "bg-white/10 border-[#5B7AA6]"
                      : "bg-white/60 border-[#D4CFC0]"
                  }`}
                >
                  <Code2
                    size={18}
                    className={`transition-colors duration-700 ${
                      isDarkMode ? "text-[#5B7AA6]" : "text-[#3B4A6B]"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium font-mono transition-colors duration-700 ${
                      isDarkMode ? "text-[#5B7AA6]" : "text-[#3B4A6B]"
                    }`}
                  >
                    Web Developer
                  </span>
                </div>
                <h1
                  className={`text-6xl font-bold mb-6 leading-tight transition-colors duration-700 ${
                    isDarkMode ? "text-[#F5F1E8]" : "text-[#2A2A2A]"
                  }`}
                >
                  Je crée des
                  <br />
                  <span
                    className={`transition-colors duration-700 ${
                      isDarkMode ? "text-[#5B7AA6]" : "text-[#3B4A6B]"
                    }`}
                  >
                    expériences web
                  </span>
                  <br />
                  performantes
                </h1>
                <p
                  className={`text-lg mb-8 leading-relaxed transition-colors duration-700 ${
                    isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
                  }`}
                >
                  React, Next.js, et technologies modernes pour transformer vos
                  idées en applications web robustes et élégantes.
                </p>
                <button
                  className={`group inline-flex items-center gap-2 px-8 py-4 text-white rounded-2xl transition-all hover:gap-4 duration-700 ${
                    isDarkMode
                      ? "bg-[#5B7AA6] hover:bg-[#4A6A95]"
                      : "bg-[#3B4A6B] hover:bg-[#2A3A5B]"
                  }`}
                >
                  Voir mes projets
                  <ArrowRight size={20} className="transition-all" />
                </button>
              </div>

              {/* Design Side */}
              <div
                className={`text-right transition-all duration-500 ${
                  !isDevSide
                    ? "opacity-100 translate-x-0"
                    : "opacity-40 translate-x-4"
                }`}
              >
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-full mb-6 border transition-all duration-700 ${
                    isDarkMode
                      ? "bg-white/10 border-[#766B5E]"
                      : "bg-white/60 border-[#D4CFC0]"
                  }`}
                >
                  <Palette
                    size={18}
                    className={`transition-colors duration-700 ${
                      isDarkMode ? "text-[#766B5E]" : "text-[#766B5E]"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium font-mono transition-colors duration-700 ${
                      isDarkMode ? "text-[#766B5E]" : "text-[#766B5E]"
                    }`}
                  >
                    UI/UX Designer
                  </span>
                </div>
                <h1
                  className={`text-6xl font-bold mb-6 leading-tight transition-colors duration-700 ${
                    isDarkMode ? "text-[#F5F1E8]" : "text-[#2A2A2A]"
                  }`}
                >
                  Je conçois des
                  <br />
                  <span
                    className={`transition-colors duration-700 ${
                      isDarkMode ? "text-[#766B5E]" : "text-[#766B5E]"
                    }`}
                  >
                    interfaces
                  </span>
                  <br />
                  intuitives
                </h1>
                <p
                  className={`text-lg mb-8 leading-relaxed transition-colors duration-700 ${
                    isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
                  }`}
                >
                  Design system, prototypage, et recherche utilisateur pour
                  créer des expériences mémorables et centrées sur l&apos;humain.
                </p>
                <button
                  className={`group inline-flex items-center gap-2 px-8 py-4 text-white rounded-2xl transition-all hover:gap-4 duration-700 ${
                    isDarkMode
                      ? "bg-[#766B5E] hover:bg-[#665B4E]"
                      : "bg-[#766B5E] hover:bg-[#665B4E]"
                  }`}
                >
                  Voir mon design
                  <ArrowRight size={20} className="transition-all" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator with Fade Out */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce transition-opacity duration-500"
          style={{
            opacity: scrollY > 100 ? 0 : 1,
            pointerEvents: scrollY > 100 ? "none" : "auto",
          }}
        >
          <div
            className={`w-6 h-10 border-2 rounded-full flex items-start justify-center p-2 transition-colors duration-700 ${
              isDarkMode ? "border-[#F5F1E8]/30" : "border-[#2A2A2A]/30"
            }`}
          >
            <div
              className={`w-1.5 h-3 rounded-full transition-colors duration-700 ${
                isDarkMode ? "bg-[#F5F1E8]/30" : "bg-[#2A2A2A]/30"
              }`}
            />
          </div>
        </div>
      </section>

      {/* Wrapper with higher z-index for sections to slide over Hero */}
      <div className="relative" style={{ zIndex: 10 }}>
        {/* About Section */}
        <section
          id="about"
          className={`pt-20 pb-16 transition-colors duration-700 ${
            isDarkMode ? "bg-[#0F0F0F]" : "bg-white"
          }`}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-[400px_1fr] gap-16 items-start">
              {/* Colonne gauche : Photo + Stats */}
              <div className="space-y-4">
                {/* Photo de profil - centrée */}
                <div className="flex justify-center">
                  <div className="relative group">
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br from-[#5B7AA6] to-[#766B5E] opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-700`}
                    />
                    <img
                      src="/images/profile.jpg"
                      alt="Nadhir - Développeur & Designer UI/UX"
                      className={`relative w-80 h-80 rounded-full object-cover border-4 transition-all duration-700 group-hover:scale-105 ${
                        isDarkMode
                          ? "border-[#2A2A2A] shadow-2xl"
                          : "border-[#F5F1E8] shadow-xl"
                      }`}
                    />
                  </div>
                </div>

                {/* Stats en grid 2x2 */}
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`p-6 rounded-2xl hover:shadow-lg transition-all duration-700 ${
                      isDarkMode ? "bg-[#2A2A2A]" : "bg-[#F5F1E8]"
                    }`}
                  >
                    <div
                      className={`text-3xl font-bold font-mono mb-2 transition-colors duration-700 ${
                        isDarkMode ? "text-[#5B7AA6]" : "text-[#3B4A6B]"
                      }`}
                    >
                      3+
                    </div>
                    <div
                      className={`text-sm transition-colors duration-700 ${
                        isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
                      }`}
                    >
                      Projets clients réalisés
                    </div>
                  </div>
                  <div
                    className={`p-6 rounded-2xl hover:shadow-lg transition-all duration-700 ${
                      isDarkMode ? "bg-[#2A2A2A]" : "bg-[#F5F1E8]"
                    }`}
                  >
                    <div
                      className={`text-3xl font-bold font-mono mb-2 transition-colors duration-700 ${
                        isDarkMode ? "text-[#766B5E]" : "text-[#766B5E]"
                      }`}
                    >
                      5+
                    </div>
                    <div
                      className={`text-sm transition-colors duration-700 ${
                        isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
                      }`}
                    >
                      Maquettes design
                    </div>
                  </div>
                  <div
                    className={`p-6 rounded-2xl hover:shadow-lg transition-all duration-700 ${
                      isDarkMode ? "bg-[#2A2A2A]" : "bg-[#F5F1E8]"
                    }`}
                  >
                    <div
                      className={`text-3xl font-bold font-mono mb-2 transition-colors duration-700 ${
                        isDarkMode ? "text-[#5B7AA6]" : "text-[#3B4A6B]"
                      }`}
                    >
                      10+
                    </div>
                    <div
                      className={`text-sm transition-colors duration-700 ${
                        isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
                      }`}
                    >
                      Technologies maîtrisées
                    </div>
                  </div>
                  <div
                    className={`p-6 rounded-2xl hover:shadow-lg transition-all duration-700 ${
                      isDarkMode ? "bg-[#2A2A2A]" : "bg-[#F5F1E8]"
                    }`}
                  >
                    <div
                      className={`text-3xl font-bold font-mono mb-2 transition-colors duration-700 ${
                        isDarkMode ? "text-[#766B5E]" : "text-[#766B5E]"
                      }`}
                    >
                      100%
                    </div>
                    <div
                      className={`text-sm transition-colors duration-700 ${
                        isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
                      }`}
                    >
                      Clients satisfaits
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonne droite : Contenu */}
              <div className="space-y-8">
                <div>
                                    }`}
                >
                  <p className="text-lg leading-relaxed">
                    Hello, moi c&apos;est Nadhir 👋🏼
                  </p>
                  <div
                    className={`w-20 h-1 bg-gradient-to-r rounded-full transition-all duration-700 ${
                      isDarkMode
                        ? "from-[#5B7AA6] to-[#766B5E]"
                        : "from-[#3B4A6B] to-[#766B5E]"
                    }`}
                  />
                </div>

                <div className="space-y-6">
                  <p
                    className={`text-lg leading-relaxed transition-colors duration-700 ${
                      isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
                    }`}
                  >
                    Je suis un jeune développeur web passionné par la création
                    d&apos;expériences digitales qui allient{" "}
                    <span
                      className={`font-semibold transition-colors duration-700 ${
                        isDarkMode ? "text-[#5B7AA6]" : "text-[#3B4A6B]"
                      }`}
                    >
                      performance technique
                    </span>{" "}
                    et{" "}
                    <span
                      className={`font-semibold transition-colors duration-700 ${
                        isDarkMode ? "text-[#766B5E]" : "text-[#766B5E]"
                      }`}
                    >
                      excellence design
                    </span>
                    .
                  </p>
                  <p
                    className={`text-lg leading-relaxed transition-colors duration-700 ${
                      isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
                    }`}
                  >
                    Actuellement en recherche d&apos;alternance en UI/UX Design pour
                    janvier/février 2026, je continue de développer des sites
                    web pour mes clients tout en approfondissant mes compétences
                    en design d&apos;interface.
                  </p>
                </div>

                <div className="flex gap-4">
                  <a
                    href="https://github.com/nadhirbk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-all duration-700 group ${
                      isDarkMode
                        ? "bg-[#2A2A2A] hover:bg-[#3B4A6B]"
                        : "bg-[#F5F1E8] hover:bg-[#766B5E]"
                    }`}
                  >
                    <Github
                      size={24}
                      className={`transition-colors duration-700 ${
                        isDarkMode
                          ? "text-[#F5F1E8] group-hover:text-white"
                          : "text-[#2A2A2A] group-hover:text-white"
                      }`}
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nadhirbenkhaled/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-all duration-700 group ${
                      isDarkMode
                        ? "bg-[#2A2A2A] hover:bg-[#3B4A6B]"
                        : "bg-[#F5F1E8] hover:bg-[#766B5E]"
                    }`}
                  >
                    <Linkedin
                      size={24}
                      className={`transition-colors duration-700 ${
                        isDarkMode
                          ? "text-[#F5F1E8] group-hover:text-white"
                          : "text-[#2A2A2A] group-hover:text-white"
                      }`}
                    />
                  </a>
                  <a
                    href="mailto:dev.nadhirbk@gmail.com"
                    className={`p-3 rounded-full transition-all duration-700 group ${
                      isDarkMode
                        ? "bg-[#2A2A2A] hover:bg-[#3B4A6B]"
                        : "bg-[#F5F1E8] hover:bg-[#766B5E]"
                    }`}
                  >
                    <Mail
                      size={24}
                      className={`transition-colors duration-700 ${
                        isDarkMode
                          ? "text-[#F5F1E8] group-hover:text-white"
                          : "text-[#2A2A2A] group-hover:text-white"
                      }`}
                    />
                  </a>
                </div>

                {/* Skills : Stack technique + Outils design côte à côte */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Stack technique */}
                  <div>
                    <h3
                      className={`text-xl font-bold mb-4 flex items-center gap-2 transition-colors duration-700 ${
                        isDarkMode ? "text-[#F5F1E8]" : "text-[#2A2A2A]"
                      }`}
                    >
                      <Code2
                        size={20}
                        className={`transition-colors duration-700 ${
                          isDarkMode ? "text-[#5B7AA6]" : "text-[#3B4A6B]"
                        }`}
                      />
                      Stack technique
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React",
                        "Next.js",
                        "TypeScript",
                        "Tailwind CSS",
                        "Node.js",
                        "Git",
                      ].map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1.5 text-sm border rounded-full transition-all duration-700 cursor-default ${
                            isDarkMode
                              ? "bg-[#2A2A2A] border-[#3A3A3A] text-[#F5F1E8] hover:border-[#5B7AA6] hover:text-[#5B7AA6]"
                              : "bg-white border-[#D4CFC0] text-[#2A2A2A] hover:border-[#3B4A6B] hover:text-[#3B4A6B]"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Outils design */}
                  <div>
                    <h3
                      className={`text-xl font-bold mb-4 flex items-center gap-2 transition-colors duration-700 ${
                        isDarkMode ? "text-[#F5F1E8]" : "text-[#2A2A2A]"
                      }`}
                    >
                      <Palette
                        size={20}
                        className={`transition-colors duration-700 ${
                          isDarkMode ? "text-[#766B5E]" : "text-[#766B5E]"
                        }`}
                      />
                      Outils design
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Figma",
                        "Adobe XD",
                        "Photoshop",
                        "Illustrator",
                        "Prototyping",
                        "User Research",
                      ].map((tool) => (
                        <span
                          key={tool}
                          className={`px-3 py-1.5 text-sm border rounded-full transition-all duration-700 cursor-default ${
                            isDarkMode
                              ? "bg-[#2A2A2A] border-[#3A3A3A] text-[#F5F1E8] hover:border-[#B8957A] hover:text-[#B8957A]"
                              : "bg-white border-[#D4CFC0] text-[#2A2A2A] hover:border-[#766B5E] hover:text-[#766B5E]"
                          }`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Projets */}
        <section
          id="projects"
          className={`py-20 transition-colors duration-700 ${
            isDarkMode ? "bg-[#0F0F0F]" : "bg-white"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6">
            {/* Titre */}
            <div className="text-center mb-12">
              <h2
                className={`text-5xl font-bold mb-6 transition-colors duration-700 ${
                  isDarkMode ? "text-[#F5F1E8]" : "text-[#2A2A2A]"
                }`}
              >
                Mes projets
              </h2>
              <p
                className={`text-lg transition-colors duration-700 ${
                  isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
                }`}
              >
                Une sélection de mes réalisations en développement web et design
                UI/UX
              </p>
            </div>

            {/* Filtres */}
            <div className="flex justify-center gap-4 mb-12">
              <button
                onClick={() => setProjectFilter("all")}
                className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                  projectFilter === "all"
                    ? isDarkMode
                      ? "bg-[#5B7AA6] text-white"
                      : "bg-[#766B5E] text-white"
                    : isDarkMode
                    ? "bg-[#2A2A2A] text-[#B0B0B0] hover:bg-[#3A3A3A]"
                    : "bg-[#F5F1E8] text-[#6B6B6B] hover:bg-[#E5DED0]"
                }`}
              >
                Tout
              </button>
              <button
                onClick={() => setProjectFilter("dev")}
                className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                  projectFilter === "dev"
                    ? isDarkMode
                      ? "bg-[#5B7AA6] text-white"
                      : "bg-[#3B4A6B] text-white"
                    : isDarkMode
                    ? "bg-[#2A2A2A] text-[#B0B0B0] hover:bg-[#3A3A3A]"
                    : "bg-[#F5F1E8] text-[#6B6B6B] hover:bg-[#E5DED0]"
                }`}
              >
                Dev Web
              </button>
              <button
                onClick={() => setProjectFilter("design")}
                className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                  projectFilter === "design"
                    ? isDarkMode
                      ? "bg-[#766B5E] text-white"
                      : "bg-[#766B5E] text-white"
                    : isDarkMode
                    ? "bg-[#2A2A2A] text-[#B0B0B0] hover:bg-[#3A3A3A]"
                    : "bg-[#F5F1E8] text-[#6B6B6B] hover:bg-[#E5DED0]"
                }`}
              >
                UI/UX Design
              </button>
            </div>

            {/* Grid de projets */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getAllProjects()
                .filter(
                  (project) =>
                    projectFilter === "all" ||
                    project.category === projectFilter
                )
                .map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                      isDarkMode ? "bg-[#1A1A1A]" : "bg-[#F5F1E8]"
                    }`}
                  >
                    <div
                      className={`aspect-video ${
                        isDarkMode ? "bg-[#2A2A2A]" : "bg-[#E5DED0]"
                      } flex items-center justify-center`}
                    >
                      {project.category === "dev" ? (
                        <Code2
                          size={48}
                          className={
                            isDarkMode ? "text-[#5B7AA6]" : "text-[#3B4A6B]"
                          }
                        />
                      ) : (
                        <Palette size={48} className="text-[#766B5E]" />
                      )}
                    </div>
                    <div className="p-6">
                      <h3
                        className={`text-xl font-bold mb-2 transition-colors duration-700 ${
                          isDarkMode ? "text-[#F5F1E8]" : "text-[#2A2A2A]"
                        }`}
                      >
                        {project.title}
                      </h3>
                      <p
                        className={`text-sm mb-4 transition-colors duration-700 ${
                          isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
                        }`}
                      >
                        {project.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 2).map((tech, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 rounded-full text-xs ${
                              project.category === "dev"
                                ? isDarkMode
                                  ? "bg-[#5B7AA6] text-white"
                                  : "bg-[#3B4A6B] text-white"
                                : "bg-[#766B5E] text-white"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* CTA Section avec effet fade-in au scroll */}
        <section
          id="contact"
          className={`py-20 transition-all duration-1000 ease-out ${
            isDarkMode ? "bg-[#1A1A1A]" : "bg-[#F5F1E8]"
          }`}
          style={{
            animation: "slideUp 0.8s ease-out",
          }}
        >
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2
                className={`text-5xl font-bold mb-6 transition-colors duration-700 ${
                  isDarkMode ? "text-[#F5F1E8]" : "text-[#2A2A2A]"
                }`}
              >
                Prêt à collaborer ?
              </h2>
              <p
                className={`text-xl transition-colors duration-700 ${
                  isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
                }`}
              >
                Que ce soit pour un projet web ou une alternance UI/UX,
                discutons de vos besoins.
              </p>
            </div>

            {/* Formulaire de contact */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Prénom & Nom */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="prenom"
                    placeholder="Prénom"
                    value={formData.prenom}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-6 py-4 rounded-xl transition-all duration-700 focus:outline-none focus:ring-2 ${
                      formErrors.prenom ? "ring-2 ring-red-500" : ""
                    } ${
                      isDarkMode
                        ? "bg-[#2A2A2A] text-[#F5F1E8] placeholder-[#6B6B6B] focus:ring-[#5B7AA6]"
                        : "bg-white text-[#2A2A2A] placeholder-[#6B6B6B] focus:ring-[#766B5E]"
                    }`}
                  />
                  {formErrors.prenom && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.prenom}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    value={formData.nom}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-6 py-4 rounded-xl transition-all duration-700 focus:outline-none focus:ring-2 ${
                      formErrors.nom ? "ring-2 ring-red-500" : ""
                    } ${
                      isDarkMode
                        ? "bg-[#2A2A2A] text-[#F5F1E8] placeholder-[#6B6B6B] focus:ring-[#5B7AA6]"
                        : "bg-white text-[#2A2A2A] placeholder-[#6B6B6B] focus:ring-[#766B5E]"
                    }`}
                  />
                  {formErrors.nom && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.nom}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-6 py-4 rounded-xl transition-all duration-700 focus:outline-none focus:ring-2 ${
                    formErrors.email ? "ring-2 ring-red-500" : ""
                  } ${
                    isDarkMode
                      ? "bg-[#2A2A2A] text-[#F5F1E8] placeholder-[#6B6B6B] focus:ring-[#5B7AA6]"
                      : "bg-white text-[#2A2A2A] placeholder-[#6B6B6B] focus:ring-[#766B5E]"
                  }`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  placeholder="Votre message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-6 py-4 rounded-xl transition-all duration-700 focus:outline-none focus:ring-2 resize-none ${
                    formErrors.message ? "ring-2 ring-red-500" : ""
                  } ${
                    isDarkMode
                      ? "bg-[#2A2A2A] text-[#F5F1E8] placeholder-[#6B6B6B] focus:ring-[#5B7AA6]"
                      : "bg-white text-[#2A2A2A] placeholder-[#6B6B6B] focus:ring-[#766B5E]"
                  }`}
                ></textarea>
                {formErrors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.message}
                  </p>
                )}
              </div>

              {/* Bouton d'envoi */}
              <div className="text-center">
                <button
                  type="submit"
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl transition-all font-medium duration-700 group ${
                    isDarkMode
                      ? "bg-[#F5F1E8] text-[#1A1A1A] hover:bg-[#5B7AA6] hover:text-white"
                      : "bg-[#2A2A2A] text-[#F5F1E8] hover:bg-[#766B5E]"
                  }`}
                >
                  Envoyer le message
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`py-12 border-t transition-colors duration-700 ${
            isDarkMode
              ? "bg-[#0F0F0F] border-[#2A2A2A] text-[#B0B0B0]"
              : "bg-white border-[#E5E5E5] text-[#6B6B6B]"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div
                className={`text-sm transition-colors duration-700 ${
                  isDarkMode ? "text-[#B0B0B0]" : "text-[#6B6B6B]"
                }`}
              >
                Fait avec ❤️ en 2025
              </div>
              <div className="flex gap-6 items-center">
                <a
                  href="https://github.com/nadhirbk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-700 ${
                    isDarkMode ? "hover:text-[#5B7AA6]" : "hover:text-[#766B5E]"
                  }`}
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/nadhirbenkhaled/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-700 ${
                    isDarkMode ? "hover:text-[#5B7AA6]" : "hover:text-[#766B5E]"
                  }`}
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:dev.nadhirbk@gmail.com"
                  className={`transition-colors duration-700 ${
                    isDarkMode ? "hover:text-[#5B7AA6]" : "hover:text-[#766B5E]"
                  }`}
                >
                  <Mail size={20} />
                </a>
              </div>
              <div className="text-sm">
                © {new Date().getFullYear()} Tous droits réservés
              </div>
            </div>
          </div>
        </footer>
      </div>
      {/* End of wrapper */}
    </main>
  );
}
