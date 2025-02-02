"use client"
import React, {useEffect, useState} from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import {AlbumInfo} from "@/libs/types/productType";

export default function AlbumCarousel({ albums }: { albums?: AlbumInfo[] }) {
  const [currentAlbum, setCurrentAlbum] = useState<AlbumInfo | null>(albums ? albums[0] : null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);

  const handleNext = () => {
    if (!currentAlbum || !currentAlbum.items.length || currentAlbum.items.length === 0) {
      return;
    }
    if (currentIndex < currentAlbum.items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAlbumNext = () => {
    if (!albums || albums.length === 0) return;
    if (currentAlbumIndex + itemsPerPage < albums.length) {
      setCurrentAlbumIndex(currentAlbumIndex + 1);
    }
  };

  const handleAlbumPrevious = () => {
    if (currentAlbumIndex > 0) {
      setCurrentAlbumIndex(currentAlbumIndex - 1);
    }
  };

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(5);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  return (
      <>
        {
          albums && albums.length > 0 ? (
            currentAlbum && currentAlbum.items.length > 0 ?
                (
                    <div className="flex flex-col gap-10 w-full">
                      <Carousel className="w-full h-[16rem]"
                                opts={{
                                        align: 'start',
                                        dragFree: true,
                                        watchDrag: false,
                                }}
                      >
                        <CarouselContent className="h-[16rem]">
                          {currentAlbum.items.map((_ , index) => (
                              <CarouselItem key={index}>
                                <div className="p-1 h-full">
                                  <Card className="h-full overflow-hidden">
                                    <CardContent className="h-full p-0 overflow-hidden">
                                      <img
                                          src={currentAlbum.items[index].image ? currentAlbum.items[index].image : "/fallback-image.jpg"}
                                          alt="product"
                                          className="w-full h-full object-cover"
                                      />
                                    </CardContent>
                                  </Card>
                                </div>
                              </CarouselItem>
                          ))}
                        </CarouselContent>
                        <div className="py-2 text-center">
                          {Array.from({ length: currentAlbum.items.length }).map((_, index) => (
                              <span key={index} className={`inline-block h-2 w-2 rounded-full mx-1 ${index === currentIndex ? 'bg-gray-600' : 'bg-gray-300'}`} />
                          ))}
                        </div>
                        <CarouselPrevious
                            className={`-left-4 ${currentIndex === 0 || !currentAlbum.items.length || currentAlbum.items.length === 0 ? "hidden" : ""}`}
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                        />
                        <CarouselNext
                            className={`-right-4 ${currentIndex === currentAlbum.items.length - 1 || !currentAlbum.items.length || currentAlbum.items.length === 0 ? "hidden" : ""}`}
                            onClick={handleNext}
                            disabled={currentIndex === currentAlbum.items.length - 1}
                        />
                      </Carousel>
                      <Carousel className="cursor-pointer"
                                opts={{
                                  align: 'start',
                                  dragFree: true,
                                  watchDrag: false,
                                }}
                      >
                        <CarouselContent className={`-ml-1 ${albums.length < itemsPerPage ? "flex justify-center" : ""}`}>
                          {albums.map((_, index) => (
                              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/5">
                                <div className="p-1">
                                  <Card className="overflow-hidden">
                                    <CardContent
                                        className="flex aspect-square items-center justify-center p-0"
                                        onClick={() => setCurrentAlbum(_)}
                                    >
                                      <img
                                          src={_.items[0].image ? _.items[0].image : "/fallback-image.jpg"}
                                          alt="product"
                                          className="w-full h-full object-cover"
                                      />
                                      {/*<span className="text-2xl font-semibold">{index + 1}</span>*/}
                                    </CardContent>
                                  </Card>
                                </div>
                              </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious
                            className={`-left-4 ${currentAlbumIndex === 0 ? "hidden" : ""}`}
                            onClick={handleAlbumPrevious}
                            disabled={currentAlbumIndex === 0}
                        />
                        <CarouselNext
                            className={`-right-4 ${currentAlbumIndex + itemsPerPage >= albums.length ? "hidden" : ""}`}
                            onClick={handleAlbumNext}
                            disabled={currentAlbumIndex + itemsPerPage >= albums.length}
                        />
                      </Carousel>
                    </div>
                )
                : (<div className="w-full h-[16rem]"/>)
          ) : null
        }
      </>
  );
}
