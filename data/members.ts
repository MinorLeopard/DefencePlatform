export type Member = {
  id: string;
  name: string;
  role: string;
  org: string;
  location: string;
  badges: string[];
  contributions: number;
  domain: string;
  avatarSeed: string;
};

export const featuredMembers: Member[] = [
  { id: "M-1", name: "Aarav Pillai", role: "Founder & maintainer", org: "Skyops Defence", location: "Bengaluru", badges: ["Flagship maintainer", "Summit speaker"], contributions: 1_204, domain: "Autonomy", avatarSeed: "aarav" },
  { id: "M-2", name: "Meghna Rao", role: "CEO", org: "Sarvatra Systems", location: "Hyderabad", badges: ["Capability Bharat '25"], contributions: 842, domain: "GEOINT", avatarSeed: "meghna" },
  { id: "M-3", name: "Dr. K. Iyer", role: "Principal investigator", org: "RCI", location: "Hyderabad", badges: ["Ecosystem anchor", "Mentor"], contributions: 611, domain: "Sensors", avatarSeed: "kiyer" },
  { id: "M-4", name: "Arunima Sen", role: "Managing Partner", org: "Cornerstone Defence Partners", location: "Mumbai", badges: ["Investor council"], contributions: 318, domain: "Capital", avatarSeed: "arunima" },
  { id: "M-5", name: "Anoushka Das", role: "CEO", org: "DeepReef Labs", location: "Kochi", badges: ["Pitch Day winner"], contributions: 486, domain: "Maritime", avatarSeed: "anoushka" },
  { id: "M-6", name: "Aishwarya Nambiar", role: "CEO", org: "Vayu Spectrum", location: "Bengaluru", badges: ["Builder"], contributions: 292, domain: "EW", avatarSeed: "aish" },
  { id: "M-7", name: "Capt. R. Menon (retd.)", role: "Advisor", org: "BDN", location: "Coonoor", badges: ["Field advisor"], contributions: 214, domain: "Operations", avatarSeed: "menon" },
  { id: "M-8", name: "Shreya Kulkarni", role: "CEO", org: "Ashwin Radios", location: "Pune", badges: ["Summit speaker"], contributions: 512, domain: "Comms", avatarSeed: "shreya" },
];
