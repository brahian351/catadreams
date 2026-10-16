"use client";

import { CSSProperties, useEffect, useState } from "react";


interface Butterfly {
    id: number;
    x: number; //Posición horizontal (%)
    size: number; // px
    duration: number; // Seg que tarda en caer
    delay: number; //Seg (negativo: ya estan cayendo al cargar)
    sway: number; //ppx es vaiven lateral
    swayDuration: number;
    flap: number; // seg por aleteo
    opacity: number;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export default function ButterflyRain() {
    const [items, setItems] = useState<Butterfly[]>([]);

    // Se genera en el cliente para evitar errores de hidratación con Math.random()
    useEffect(() => {
        const count = window.innerWidth < 640 ? 10 : 20;
        setItems(
            Array.from({ length: count }, (_, i) => {
                const duration = rand(12, 24);
                return {
                    id: i,
                    x: rand(0, 100),
                    size: rand(18, 46),
                    duration,
                    delay: -rand(0, duration),
                    sway: rand(20, 70),
                    swayDuration: rand(2.5, 5),
                    flap: rand(0.25, 0.5),
                    opacity: rand(0.35, 0.85),
                };
            }),
        );
    }, []);

    return (
        <div aria-hidden="true" className="butterfly-rain pointer-events-none fixed inset-0 z-30 overflow-hidden">
            {/* Mariposa definida una sola vez y reutilizada */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <linearGradient id="bg-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#fff2d6f" />
                        <stop offset="1" stopColor="#7a0b3a" />
                    </linearGradient>
                    <symbol id="bf" viewBox="0 0 200 170">
                        <g stroke="#ff2d6f" strokeWidth="3" fill="url(#bg-grad)" fillOpacity="0.55">
                            <g id="bf-wing">
                                <path d="M100 82 C118 18 178 0 194 30 C205 56  160 86 100 86 Z" />
                                <path d="M100 88 C150 92 182 122 166 148 C150 168 114 132 100 98 Z" />
                            </g>
                            <use href="#bf-wing" transform="translate(200,0) scale(-1,1)" />
                            <ellipse cx="100" cy="88" rx="4" ry="32" fill="#ff2d6f" fillOpacity="1" />
                        </g>
                    </symbol>
                </defs>
            </svg>

            {items.map((b) => (
                <div
                    key={b.id}
                    className="butterfly"
                    style={
                        {
                            "--x": `${b.x}%`,
                            "--size": `${b.size}px`,
                            "--dur": `${b.duration}s`,
                            "--delay": `${b.delay}s`,
                            "--sway": `${b.sway}px`,
                            "--sway-dur": `${b.swayDuration}s`,
                            "--flap": `${b.flap}s`,
                            opacity: b.opacity

                        } as CSSProperties
                    }
                >
                    <div className="butterfly-sway">
                        <svg viewBox="0 0 200 170">
                            <use href="#bf" />
                        </svg>
                    </div>
                </div>
            ))}
        </div>
    )
}