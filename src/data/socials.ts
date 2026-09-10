import { type iconPaths } from './icons';

type Social = {
    label: string;
    href: string;
    icon: keyof typeof iconPaths;
};

export const socials: Social[] = [
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/hans-wassermann-901730296',
        icon: 'linkedin-logo'
    }
];
