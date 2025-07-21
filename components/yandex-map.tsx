"use client"

import { useEffect, useRef } from "react"
import { useLanguage } from "@/contexts/language-context"

declare global {
  interface Window {
    ymaps: any
  }
}

interface YandexMapProps {
  className?: string
}

export function YandexMap({ className = "" }: YandexMapProps) {
  const { language } = useLanguage()
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)

  useEffect(() => {
    const loadYandexMaps = () => {
      if (window.ymaps && mapRef.current && !mapInstance.current) {
        window.ymaps.ready(() => {
          // Координаты офиса FARMALECH
          const coordinates = [41.203523, 69.253353]
          
          mapInstance.current = new window.ymaps.Map(mapRef.current, {
            center: coordinates,
            zoom: 16,
            controls: ['zoomControl', 'fullscreenControl']
          })

          // Добавляем метку офиса
          const balloonContent = language === 'uz' 
            ? `
                <div style="padding: 10px;">
                  <h3 style="margin: 0 0 10px 0; color: #1f2937;">AF FARMALECH</h3>
                  <p style="margin: 0; color: #6b7280;">Toshkent sh., Sergeli tumani<br>Nilufar ko'ch., 3-o'tish, 2</p>
                  <p style="margin: 10px 0 0 0; color: #6b7280;">Tel: +998 99 037 33 00</p>
                </div>
              `
            : `
                <div style="padding: 10px;">
                  <h3 style="margin: 0 0 10px 0; color: #1f2937;">AF FARMALECH</h3>
                  <p style="margin: 0; color: #6b7280;">г. Ташкент, Сергелийский район<br>ул. Нилуфар, 3 проезд, 2</p>
                  <p style="margin: 10px 0 0 0; color: #6b7280;">Тел: +998 99 037 33 00</p>
                </div>
              `

          const placemark = new window.ymaps.Placemark(
            coordinates,
            {
              balloonContent,
              hintContent: 'AF FARMALECH'
            },
            {
              preset: 'islands#redDotIcon'
            }
          )

          mapInstance.current.geoObjects.add(placemark)
        })
      }
    }

    // Загружаем API Яндекс карт
    if (!window.ymaps) {
      const script = document.createElement('script')
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=&lang=ru_RU&load=package.full'
      script.async = true
      script.onload = loadYandexMaps
      document.head.appendChild(script)
    } else {
      loadYandexMaps()
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy()
        mapInstance.current = null
      }
    }
  }, [language])

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-64 rounded-lg ${className}`}
      style={{ minHeight: '256px' }}
    />
  )
} 