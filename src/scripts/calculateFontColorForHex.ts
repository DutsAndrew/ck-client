function getRelativeLuminance(hexColor: string): number {
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
  if (!rgb) {
      throw new Error('Invalid hex color');
  }
  
  const [, r, g, b] = rgb.map(c => parseInt(c, 16) / 255);

  const gammaCorrect = (c: number): number => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  const R = gammaCorrect(r);
  const G = gammaCorrect(g);
  const B = gammaCorrect(b);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function getFontColorForHex(hexColor: string): string {
  if (hexColor.length === 0) return '';

  const luminance = getRelativeLuminance(hexColor);
  
  // Adjust the contrast ratio threshold to fit your readability preference
  const threshold = 4.5; // Example threshold for WCAG AA standard
  const contrast = (luminance + 0.05) / 0.05; // Contrast ratio formula

  return contrast >= threshold ? '#000000' : '#ffffff'; // Use black or white based on contrast
}


export {
  getFontColorForHex,
};
