import { useMemo, useEffect, useState } from 'react';
import type { Background, BackgroundConfig } from '../../types/vn';
import { normalizeBackground, validateZoomScale } from '../../types/vn';

interface BackgroundRendererProps {
    background?: Background;
    className?: string;
}

export function BackgroundRenderer({ background, className = "" }: BackgroundRendererProps) {
    // 1. Hooks always run in the same order
    const [animationKey, setAnimationKey] = useState(0);

    // 2. Normalize background safely
    const config: BackgroundConfig | null = useMemo(() => {
        if (!background) return null;
        return normalizeBackground(background);
    }, [background]);

    const image = config?.image;
    const effects = config?.effects;
    const alt = config?.alt;

    // 3. Reset animation when background image changes
    useEffect(() => {
        if (!image) return;
        setAnimationKey(prev => prev + 1);
    }, [image]);

    // 4. Generate zoom keyframes and styles
    const zoomData = useMemo(() => {
        if (!effects?.zoom?.enabled) {
            return { keyframes: '', animationStyle: {} };
        }

        const zoom = effects.zoom;
        const startScale = validateZoomScale(zoom.startScale ?? 1.0);
        const endScale = validateZoomScale(zoom.endScale ?? 1.1);
        const duration = zoom.duration ?? 8;
        const easing = zoom.easing ?? 'ease-in-out';
        const delay = zoom.delay ?? 0;
        const loop = zoom.loop ?? true;
        const direction = zoom.direction ?? 'in-out';

        const animationName = `kenBurns-${animationKey}`;

        let keyframesContent = '';
        switch (direction) {
            case 'in':
                keyframesContent = `
          @keyframes ${animationName} {
            0% { transform: scale(${startScale}); }
            100% { transform: scale(${endScale}); }
          }
        `;
                break;
            case 'out':
                keyframesContent = `
          @keyframes ${animationName} {
            0% { transform: scale(${endScale}); }
            100% { transform: scale(${startScale}); }
          }
        `;
                break;
            case 'in-out':
            default:
                keyframesContent = `
          @keyframes ${animationName} {
            0% { transform: scale(${startScale}); }
            50% { transform: scale(${endScale}); }
            100% { transform: scale(${startScale}); }
          }
        `;
                break;
        }

        const animationStyle = {
            animation: `${animationName} ${duration}s ${easing} ${delay}s ${loop ? 'infinite' : '1'} both`,
            transformOrigin: 'center center'
        };

        return { keyframes: keyframesContent, animationStyle };
    }, [effects?.zoom, animationKey]);

    // 5. Inject keyframes into DOM
    useEffect(() => {
        if (!zoomData.keyframes) return;

        const styleElement = document.createElement('style');
        styleElement.textContent = zoomData.keyframes;
        document.head.appendChild(styleElement);

        return () => {
            if (document.head.contains(styleElement)) {
                document.head.removeChild(styleElement);
            }
        };
    }, [zoomData.keyframes]);

    // 6. Color grading filters
    const filterStyle = useMemo(() => {
        if (!effects) return {};

        const filters: string[] = [];

        if (effects.brightness !== undefined) {
            filters.push(`brightness(${effects.brightness})`);
        }
        if (effects.contrast !== undefined) {
            filters.push(`contrast(${effects.contrast})`);
        }
        if (effects.saturation !== undefined) {
            filters.push(`saturate(${effects.saturation})`);
        }
        if (effects.hue !== undefined) {
            filters.push(`hue-rotate(${effects.hue}deg)`);
        }

        return filters.length > 0 ? { filter: filters.join(' ') } : {};
    }, [effects]);

    // 7. Transition styles
    const transitionStyle = useMemo(() => {
        if (!effects?.transition) return {};

        const { duration = 0.5, easing = 'ease-in-out' } = effects.transition;
        return {
            transition: `all ${duration}s ${easing}`
        };
    }, [effects?.transition]);

    // 8. Overlay styles
    const overlayStyle = useMemo(() => {
        if (!effects?.overlay) return null;

        const { color, blendMode = 'multiply' } = effects.overlay;
        return {
            backgroundColor: color,
            mixBlendMode: blendMode as any
        };
    }, [effects?.overlay]);

    // 9. Fallback early return — after hooks
    if (!background || !config) {
        return <div className={`absolute inset-0 bg-gray-900 ${className}`} />;
    }

    return (
        <div className={`absolute inset-0 ${className}`}>
            <img
                src={image}
                alt={alt || "Background"}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    ...filterStyle,
                    ...transitionStyle,
                    ...zoomData.animationStyle
                }}
                key={animationKey}
            />

            {overlayStyle && (
                <div
                    className="absolute inset-0"
                    style={overlayStyle}
                />
            )}
        </div>
    );
}

/* Keyword values for mix-blend-mode */
// mix-blend-mode: normal;
// mix-blend-mode: multiply;
// mix-blend-mode: screen;
// mix-blend-mode: overlay;
// mix-blend-mode: darken;
// mix-blend-mode: lighten;
// mix-blend-mode: color-dodge;
// mix-blend-mode: color-burn;
// mix-blend-mode: hard-light;
// mix-blend-mode: soft-light;
// mix-blend-mode: difference;
// mix-blend-mode: exclusion;
// mix-blend-mode: hue;
// mix-blend-mode: saturation;
// mix-blend-mode: color;
// mix-blend-mode: luminosity;
// mix-blend-mode: plus-darker;
// mix-blend-mode: plus-lighter;
