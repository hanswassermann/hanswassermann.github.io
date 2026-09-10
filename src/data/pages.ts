import { type CollectionEntry, getCollection } from "astro:content";

type Page = {
    path: string;
    title: string;
    updated?: Date;
};

type Project = CollectionEntry<'projects'>;

const staticPages: Page[] = [
    { path: '/', title: 'Home' },
    { path: '/about', title: 'About Me' },
    { path: '/projects', title: 'Projects' },
    { path: '/resume', title: 'Resume' }
];

const projects = (await getCollection('projects'))
    .sort((a: Project, b: Project) => b.data.date.valueOf() - a.data.date.valueOf());

export const pages: Page[] = [
    ...staticPages,
    ...projects.map((project: Project) => ({
        path: `/projects/${project.id}`,
        title: project.data.title,
        updated: project.data.updated
    }))
]
