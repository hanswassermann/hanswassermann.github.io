export type TimelineEntry = {
    type: 'work' | 'education';
    title: string;
    org: string;
    location?: string;
    /** 'YYYY-MM' */
    start: string;
    /** 'YYYY-MM' or 'Present' */
    end: string;
    /**
     * Optional path to a logo under /public, e.g. '/assets/experience/swarm.svg'.
     * When omitted (or the file is missing) the timeline shows an initials badge instead.
     * Suggested files to drop in public/assets/experience/:
     *   michigan, swarm, winlab, rutgers, basf, ieee-micromouse  (.svg or .png)
     */
    logo?: string;
    description?: string;
    points?: string[];
};

export const experience: TimelineEntry[] = [
    {
        type: 'education',
        title: 'M.S. Electrical & Computer Engineering',
        org: 'University of Michigan',
        location: 'Ann Arbor, MI',
        start: '2026-08',
        logo: '/assets/experience/michigan.svg', 
        end: '2028-05',
        description:
            'Control Systems specialization.'
        
        },
    {
        type: 'work',
        title: 'Undergraduate Research Assistant — Robotics & Controls',
        org: 'SWARM Intelligence Lab',
        location: 'New Brunswick, NJ',
        start: '2026-05',
        logo: '/assets/experience/swarm.png', 
        end: '2026-08',
        points: [
            'Built a multi-agent motion planning system in Python to steer four magnetic fish across a 75×75 solenoid grid in real time, using 20 Hz camera feedback and a lookahead waypoint buffer.',
            'Implemented inter-agent repulsion in the schooling model to enforce a hard minimum-spacing constraint while preserving emergent collective behavior.',
            'Designed camera-feedback stall detection and recovery logic (waypoint-skip and coil-reanchor strategies), validated through log analysis.'
        ]
    },
    {
        type: 'work',
        title: 'Augmented Reality Research Intern',
        org: 'Rutgers WINLAB',
        location: 'New Brunswick, NJ',
        logo: '/assets/experience/winlab.jpeg', 
        start: '2025-05',
        end: '2025-08',
        points: [
            'Extended a multi-user collaborative AR drawing platform with avatar and username systems, syncing user positions across HoloLens clients in real time over MQTT.',
            'Designed a QR-code-based spatial anchoring system, integrated into app launch, to align coordinate frames across multiple AR headsets.',
            'Prototyped a real-time body-tracking pipeline with an Intel RealSense depth camera and YOLO pose estimation, streaming pose data over MQTT.'
        ]
    },
    {
        type: 'work',
        title: 'Learning Assistant',
        org: 'Rutgers University',
        location: 'New Brunswick, NJ',
        logo: '/assets/experience/rutgers_circle.svg', 
        start: '2024-09',
        end: '2026-05',
        points:[
            'Lead learning activities for 2 recitations/week for an introductory MATLAB and Onshape engineering course.',
            'Facilitated student engagement by encouraging critical thinking and helping them apply their learning through guided questions.'
        ]
    },
    {
        type: 'work',
        title: 'Data Engineering Intern',
        org: 'BASF ECMS',
        location: 'Iselin, NJ',
        logo: '/assets/experience/basf.png', 
        start: '2024-05',
        end: '2024-08',
        points: [
            'Automated real-time data processing for 20+ reactor test protocols in Python, cutting manual analysis time for engineers evaluating emission-catalyst performance.',
            'Built automated quality-control checks into the pipeline to flag out-of-range sensor readings before they reached reactor personnel.',
            'Developed an interactive dashboard for engineers to access and visualize raw and processed test data.',
            'Scaled the automation framework to BASF R&D sites in China, Germany, and elsewhere.'
        ]
    },
    {
        type: 'work',
        title: 'Team Member',
        org: 'IEEE Micromouse',
        location: 'New Brunswick, NJ',
        logo: '/assets/experience/ieee.png', 
        start: '2023-09',
        end: '2023-12',
        points: [
            'Learned the basics of PCB design in KiCAD',
            'Assisted the hardware team with testing and aquiring materials, PCB design, and building the mouse.'
        ]
    },
    {
        type: 'education',
        title: 'B.S. Electrical & Computer Engineering',
        org: 'Rutgers University',
        location: 'New Brunswick, NJ',
        logo: '/assets/experience/rutgers_circle.svg', 
        start: '2023-09',
        end: '2026-05',
        description:
            '3-year track. GPA 4.00/4.00. Dean’s List (all semesters), Engineering Honors Academy, Matthew Leydt Society.'
    }
];
