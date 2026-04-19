export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
  });
};

export const formatDateRange = (startDate: string, endDate?: string, current?: boolean): string => {
  const start = formatDate(startDate);
  if (current) {
    return `${start} - Présent`;
  }
  if (endDate) {
    const end = formatDate(endDate);
    return `${start} - ${end}`;
  }
  return start;
};

export const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateContactForm = (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!formData.name.trim()) {
    errors.name = 'Le nom est requis';
  }

  if (!formData.email.trim()) {
    errors.email = 'L\'email est requis';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'L\'email n\'est pas valide';
  }

  if (!formData.subject.trim()) {
    errors.subject = 'Le sujet est requis';
  }

  if (!formData.message.trim()) {
    errors.message = 'Le message est requis';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const getSkillColor = (level: number): string => {
  if (level >= 80) return 'bg-green-500';
  if (level >= 60) return 'bg-blue-500';
  if (level >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
