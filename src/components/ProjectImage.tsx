"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

interface ProjectImageProps {
  repoName: string;
  formatProjectName: (name: string) => string;
  className?: string;
}

export default function ProjectImage({ repoName, formatProjectName, className }: ProjectImageProps) {
  const [imgSrc, setImgSrc] = useState(`/projects/${repoName}.jpg`);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    if (imgSrc === `/projects/${repoName}.jpg`) {
      setImgSrc(`/projects/${repoName}.png`);
    } else if (imgSrc === `/projects/${repoName}.png`) {
      setImgSrc(`/projects/${repoName}.jpeg`);
    } else if (imgSrc === `/projects/${repoName}.jpeg`) {
      // Fallback to formatted name if raw name fails
      setImgSrc(`/projects/${formatProjectName(repoName)}.jpg`);
    } else if (imgSrc === `/projects/${formatProjectName(repoName)}.jpg`) {
      setImgSrc(`/projects/${formatProjectName(repoName)}.png`);
    } else if (imgSrc === `/projects/${formatProjectName(repoName)}.png`) {
      setImgSrc(`/projects/${formatProjectName(repoName)}.jpeg`);
    } else {
      setImgError(true);
    }
  };

  if (!imgError) {
    return (
      <Image 
        src={imgSrc} 
        alt={repoName}
        fill
        className={className || "object-cover transition-transform duration-500 group-hover:scale-105"}
        onError={handleImageError}
      />
    );
  }

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
      <ImageIcon size={48} className="text-slate-400/30 dark:text-slate-600/30" />
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
    </div>
  );
}
