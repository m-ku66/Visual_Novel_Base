import { useMemo } from 'react';
import type { Background, BackgroundConfig } from '../../types/vn';
import { normalizeBackground } from '../../types/vn';

interface BackgroundRendererProps {
    background?: Background;
    className?: string;
}

export function BackgroundRenderer({ background, className = "" }: BackgroundRendererProps) {
    // If no background provided, return placeholder
    if (!background) {
        return (
            <div className={`absolute inset-0 bg-gray-900 ${className}`} />
        );
    }

    // Normalize to config format
    const config: BackgroundConfig = normalizeBackground(background);
    const { image, effects, alt } = config;

    // Build CSS filter string for color grading
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

    // Build transition style
    const transitionStyle = useMemo(() => {
        if (!effects?.transition) return {};

        const { duration = 0.5, easing = 'ease-in-out' } = effects.transition;
        return {
            transition: `all ${duration}s ${easing}`
        };
    }, [effects?.transition]);

    // Build overlay style
    const overlayStyle = useMemo(() => {
        if (!effects?.overlay) return null;

        const { color, blendMode = 'multiply' } = effects.overlay;
        return {
            backgroundColor: color,
            mixBlendMode: blendMode as any
        };
    }, [effects?.overlay]);

    return (
        <div className={`absolute inset-0 ${className}`}>
            {/* Main background image */}
            <img
                src={image}
                alt={alt || "Background"}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    ...filterStyle,
                    ...transitionStyle
                }}
            />

            {/* Overlay effect if specified */}
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