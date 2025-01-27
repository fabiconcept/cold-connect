export function maskEmail(email: string): string {
    if (!email || !email.includes('@')) return '';

    const [username, domain] = email.split('@');
    const domainParts = domain.split('.');

    const maskedUsername = username.slice(0, 4) + '*'.repeat(10);

    const maskedDomain = '*'.repeat(3) + '.' + domainParts[domainParts.length - 1];

    return `${maskedUsername}@${maskedDomain}`;
}