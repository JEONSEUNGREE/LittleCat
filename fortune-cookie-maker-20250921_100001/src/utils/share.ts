import html2canvas from 'html2canvas';

export const shareUtils = {
  shareText: async (text: string): Promise<void> => {
    const shareData = {
      title: 'My Fortune',
      text: `🥠 ${text}\n\n- Fortune Cookie Maker`,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
          // Fallback to clipboard
          await shareUtils.copyToClipboard(text);
        }
      }
    } else {
      // Fallback to clipboard
      await shareUtils.copyToClipboard(text);
    }
  },

  copyToClipboard: async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(`🥠 ${text}\n\n- Fortune Cookie Maker`);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = `🥠 ${text}\n\n- Fortune Cookie Maker`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  },

  captureElement: async (elementId: string): Promise<Blob | null> => {
    try {
      const element = document.getElementById(elementId);
      if (!element) return null;

      const canvas = await html2canvas(element, {
        backgroundColor: '#FEF3C7',
        scale: 2,
        logging: false,
      });

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      });
    } catch (error) {
      console.error('Error capturing element:', error);
      return null;
    }
  },

  shareImage: async (blob: Blob): Promise<void> => {
    if (!blob) return;

    const file = new File([blob], 'fortune.png', { type: 'image/png' });
    
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: 'My Fortune',
          text: 'Check out my fortune!',
          files: [file],
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing image:', error);
          // Fallback to download
          shareUtils.downloadImage(blob);
        }
      }
    } else {
      // Fallback to download
      shareUtils.downloadImage(blob);
    }
  },

  downloadImage: (blob: Blob): void => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fortune-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },
};