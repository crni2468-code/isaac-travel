import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/scroll-scrub";
export const scrollScrubTheme: ScrollScrubTheme = { accent: "#c4a36a", background: "#f7f2e8", ink: "#253b2a", muted: "#74776c" };
export const scrollScrubScenes: ScrollScrubScene[] = [
  { id:"coast", label:"חלום", poster:"/assets/destinations/tropical.jpg", clip:"", title:"העולם מחכה לרגע שלכם", body:"מקומות חדשים. חוויות מרגשות. זיכרונות שנשארים הרבה אחרי שחוזרים הביתה.", kicker:"MAKE MEMORIES, NOT JUST PLANS", scroll:1.1 },
  { id:"europe", label:"אירופה", poster:"/assets/destinations/paris.jpg", clip:"", title:"קסם אירופאי", body:"ללכת לאיבוד בסמטאות, למצוא את הפינה הקטנה שלכם ולגלות עיר בקצב שלכם.", kicker:"THE CITY ESCAPE", scroll:1.3 },
  { id:"nature", label:"טבע", poster:"/assets/destinations/mountains.jpg", clip:"", title:"לנשום טבע", body:"נופים עוצרי נשימה, מרחבים ורגעים של שקט. לצאת מהשגרה ולחזור עם אנרגיה חדשה.", kicker:"THE WILD SIDE", scroll:1.3 },
  { id:"winter", label:"חורף", poster:"/assets/destinations/winter.jpg", clip:"", title:"כשהעולם מתמלא באור", body:"שווקי חג, חופשות חורף, ערים שמתעוררות לחיים ואווירה שאי אפשר להסביר — רק להרגיש.", kicker:"SEASONAL MAGIC", scroll:1.3 }
];
