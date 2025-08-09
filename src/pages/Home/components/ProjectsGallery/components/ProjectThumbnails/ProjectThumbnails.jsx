import { useEffect } from "react";

const BASE_IMAGE_PATH = "/src/assets/img/";

export const ProjectThumbnails = ({ 
  images, 
  activeSlide, 
  onThumbnailClick, 
  isOpen,
  thumbnailsRef
}) => {
  // Sincronizar las thumbnails cuando cambie activeSlide
  useEffect(() => {
    if (!isOpen) return;

    const thumbnails = document.querySelectorAll("#carousel-thumbnails img");
    thumbnails.forEach((thumbnail, i) => {
      if (i === activeSlide) {
        thumbnail.classList.add("active-thumbnail");
        thumbnail.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      } else {
        thumbnail.classList.remove("active-thumbnail");
      }
    });
  }, [activeSlide, isOpen]);

  return (
    <div
      className="carousel-thumbnails"
      id="carousel-thumbnails"
      ref={thumbnailsRef}
    >
      {images.map((imgSrc, index) => (
        <img
          key={index}
          src={`${BASE_IMAGE_PATH}${imgSrc}`}
          alt={`Thumbnail ${index + 1}`}
          className="thumbnail"
          onClick={() => onThumbnailClick(index)}
        />
      ))}
    </div>
  );
};
