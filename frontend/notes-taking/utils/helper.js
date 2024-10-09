export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export const getInitials = (name) => {
  if (!name) return '';

  return name.split(' ').map((n) => n[0]).join('');
}
