import type { UIElementProps } from '../types/ui';

export const UIElement: React.FC<UIElementProps> = ({
    layer,
    zone,
    className = '',
    children
}) => {
    // Generate position classes based on zone
    const getZoneClasses = () => {
        const zoneMap = {
            'top-left': 'top-0 left-0 items-start justify-start',
            'top-center': 'top-0 left-1/2 transform -translate-x-1/2 items-start justify-center',
            'top-right': 'top-0 right-0 items-start justify-end',
            'center-left': 'top-1/2 left-0 transform -translate-y-1/2 items-center justify-start',
            'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center',
            'center-right': 'top-1/2 right-0 transform -translate-y-1/2 items-center justify-end',
            'bottom-left': 'bottom-0 left-0 items-end justify-start',
            'bottom-center': 'bottom-0 left-1/2 transform -translate-x-1/2 items-end justify-center',
            'bottom-right': 'bottom-0 right-0 items-end justify-end',
        };

        return zoneMap[zone] || zoneMap['center'];
    };

    // Generate z-index based on layer
    const getLayerZIndex = () => {
        const layerMap = {
            'background': 'z-0',
            'content': 'z-10',
            'navigation': 'z-20',
            'overlay': 'z-30'
        };

        return layerMap[layer] || layerMap['content'];
    };

    return (
        <div
            className={`
        absolute flex pointer-events-auto
        ${getZoneClasses()}
        ${getLayerZIndex()}
        ${className}
      `}
            data-ui-element="true"
            data-layer={layer}
            data-zone={zone}
        >
            {children}
        </div>
    );
};