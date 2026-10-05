export const easeStandard = [0.4, 0, 0.2, 1] as const;
export const easeEnter = [0.0, 0, 0.2, 1] as const;
export const easeExit = [0.4, 0, 1, 1] as const;

export const springSoft = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1,
};

export const springResponsive = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
};

export const durationShort = 0.2;
export const durationStandard = 0.4;
export const durationLong = 0.6;

export const staggerFast = 0.1;
export const staggerStandard = 0.2;

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: durationStandard, 
      ease: easeEnter 
    } 
  }
};

export const fadeVariant = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: durationStandard, 
      ease: easeEnter 
    } 
  }
};
