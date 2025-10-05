export type UIZone =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type UILayer = "background" | "content" | "navigation" | "overlay";

export interface UIElementProps {
  layer: UILayer;
  zone: UIZone;
  className?: string;
  children: React.ReactNode;
}
