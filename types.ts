
export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  duration: number; // minutes
}

export interface Country {
  name: { common: string };
  capital: string[];
  flags: { svg: string };
  population: number;
  region: string;
  subregion: string;
  languages: Record<string, string>;
}
